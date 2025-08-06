<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Models\Trainer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SessionController extends Controller
{
    /**
     * Display a listing of available sessions.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Session::with(['trainer'])
            ->where('status', 'available')
            ->where('start_time', '>', now());

        // Filter by session type
        if ($request->has('type') && in_array($request->type, ['padel', 'fitness', 'tennis'])) {
            $query->where('type', $request->type);
        }

        // Filter by trainer
        if ($request->has('trainer_id')) {
            $query->where('trainer_id', $request->trainer_id);
        }

        // Filter by date range
        if ($request->has('date_from')) {
            $query->whereDate('start_time', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('start_time', '<=', $request->date_to);
        }

        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        $sessions = $query->orderBy('start_time')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $sessions,
            'filters' => [
                'types' => ['padel', 'fitness', 'tennis'],
                'trainers' => Trainer::where('is_active', true)->get(['id', 'name', 'specializations'])
            ]
        ]);
    }

    /**
     * Display the specified session.
     */
    public function show(string $id): JsonResponse
    {
        $session = Session::with(['trainer'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $session
        ]);
    }

    /**
     * Get available trainers for a specific session type.
     */
    public function trainers(Request $request): JsonResponse
    {
        $request->validate([
            'type' => 'required|in:padel,fitness,tennis'
        ]);

        $trainers = Trainer::where('is_active', true)
            ->whereJsonContains('specializations', $request->type)
            ->get(['id', 'name', 'bio', 'specializations']);

        return response()->json([
            'success' => true,
            'data' => $trainers
        ]);
    }
}
