namespace App\Http\Controllers\Auth;

<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    // Other methods...

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to the home page or login page
        return Inertia::render('Welcome'); // Adjust the component as needed
    }
}
