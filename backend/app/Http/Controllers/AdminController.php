<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.role:admin');
    }

    public function allUserList()
    {
        $user = User::all();

        return response()->json($user, 200);

    }

    public function editUser(Request $data) {

        
        if(isset($data) && !$data->id) {
            return response()->json(array('error' => true), 200);
        }

        $user = User::find($data->id);


       
        $user->name = $data->name; 
        $user->email = $data->email;
        $user->role = $data->role;
        $user->status = $data->status;
        $user->unote = $data->unote;

        $updateUser = $user->save();

        if($updateUser) {
            return response()->json($user, 200);
        }

        return response()->json(array('error' => true), 200);

    }

}
