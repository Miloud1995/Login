<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function Signup(Request $request){
        $data = $request->validate([
            'name'=>'required|string|max:55',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|confirmed|',
        ]);
        /** @var \App\Models\User $user */
        $user = User::create([
          'name'=>$data['name'],
          'email'=>$data['email'],
         
          'password'=>bcrypt($data['password']),
          'api_token' => Str::random(60),

         ]);
         $token = $user->createToken('main')->plainTextToken;

         return response(compact('user', 'token'), 201);
        }


//    LoginLoginLoginLoginLoginLoginLoginLoginLoginLoginLoginLogin



    public function Login(Request $request){
        $credencials= $request->validate([
            'email'=>'required|email|exists:users,email',
            'password'=>'required'


          ]);
          /** @var User $user */
          if(!Auth::attempt($credencials)){
            return response([
                'message'=>'provided email or password incorrect'
            ]);
          }
          $user = Auth::user();
          $token = $user->createToken('main')->plainTextToken;

          return response(compact('user', 'token'), 201);

    }

    // Logout Logout Logout Logout Logout Logout Logout Logout
    public function Logout(){
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }
}
