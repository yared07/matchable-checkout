<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created booking.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'session_ids' => 'required|array|min:1',
            'session_ids.*' => 'required|integer|exists:sessions,id',
            'terms_accepted' => 'required|boolean|accepted',
            'notes' => 'nullable|string|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Validate sessions are available
            $sessions = Session::whereIn('id', $request->session_ids)
                ->where('status', 'available')
                ->where('start_time', '>', now())
                ->get();

            if ($sessions->count() !== count($request->session_ids)) {
                return response()->json([
                    'success' => false,
                    'message' => 'One or more sessions are not available'
                ], 400);
            }

            // Calculate total amount
            $totalAmount = $sessions->sum('price');

            // Create booking
            $booking = Booking::create([
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'selected_sessions' => $request->session_ids,
                'total_amount' => $totalAmount,
                'status' => 'confirmed',
                'notes' => $request->notes,
                'terms_accepted' => $request->terms_accepted
            ]);

            // Attach sessions to booking
            $sessionData = [];
            foreach ($sessions as $session) {
                $sessionData[$session->id] = ['price_paid' => $session->price];
            }
            $booking->sessions()->attach($sessionData);

            // Update session availability
            foreach ($sessions as $session) {
                $session->increment('current_participants');
                if ($session->current_participants >= $session->max_participants) {
                    $session->update(['status' => 'booked']);
                }
            }

            DB::commit();

            // Load sessions for response
            $booking->load('sessions.trainer');

            return response()->json([
                'success' => true,
                'message' => 'Booking created successfully',
                'data' => $booking
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified booking.
     */
    public function show(string $id): JsonResponse
    {
        $booking = Booking::with(['sessions.trainer'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $booking
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Calculate total for selected sessions.
     */
    public function calculateTotal(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'session_ids' => 'required|array|min:1',
            'session_ids.*' => 'required|integer|exists:sessions,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $sessions = Session::whereIn('id', $request->session_ids)
            ->where('status', 'available')
            ->where('start_time', '>', now())
            ->get();

        $total = $sessions->sum('price');
        $breakdown = $sessions->map(function ($session) {
            return [
                'id' => $session->id,
                'type' => $session->type,
                'trainer' => $session->trainer->name,
                'start_time' => $session->start_time,
                'duration_minutes' => $session->duration_minutes,
                'price' => $session->price
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'breakdown' => $breakdown,
                'session_count' => $sessions->count()
            ]
        ]);
    }
}
