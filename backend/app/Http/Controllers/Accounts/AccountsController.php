<?php

namespace App\Http\Controllers\Accounts;

use App\Accounts;
use App\Http\Controllers\Controller;
use App\Http\Requests\AccountRequest;
use Illuminate\Http\Request;

class AccountsController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth.role:user,admin', ['except' => ['create']]);
    }

    public function index()
    {
        $accounts = Accounts::all();

        return response()->json($accounts, 200);
    }

    public function store(AccountRequest $request)
    {
        $isUpdate = $request->input('update');
        $unumber = $request->uname . $request->upass;

        $varmi = $isUpdate ? Accounts::where('unumber', '=', md5($unumber))->whereNotIn('id', [$request->id])->first() : Accounts::where('unumber', '=', md5($unumber))->first();

        if ($varmi) {
            return response()->json(array('error' => true, 'msg' => 'Bu bilgilere ait zaten bir hesap var!'), 200);
        }

        $acc = $isUpdate ? Accounts::find($request->id) : new Accounts();
        $acc->category = $request->category;
        $acc->uname = $request->uname;
        $acc->upass = $request->upass;
        $acc->unumber = md5($unumber);
        $acc->country = $request->country;
        $acc->lang = $request->lang;
        $acc->unote = $request->unote;
        $acc->_ref = $request->_ref;
        $acc->status = $request->status ? $request->status : 1;
        $save = $acc->save();

        if (!$save) {
            return response()->json(array('error' => true), 200);
        }

        return response()->json($acc, 200);

    }

    public function customList(Request $request)
    {

        $cat = $request->input('cat');
        $ref = $request->input('ref');

        if ($cat == 1) {
            $accWhere = ['category' => $cat, 'status' => 1];
            $accounts = Accounts::where($accWhere)->orderBy('id', 'DESC')->get();
        } else {
            $accWhere = ['category' => $cat, '_ref' => $ref, 'status' => 1];
            $accounts = Accounts::where($accWhere)->orderBy('id', 'DESC')->get();
        }

        return response()->json($accounts, 200);
    }

    public function readChange(Request $request)
    {
        $account_id = $request->input('account_id');
        $read = $request->input('read') === 'true' ? 1 : 0;

        $acc = Accounts::find($account_id);

        $acc->read = $read;
        $accUpdate = $acc->save();

        return response()->json($acc, 200);
    }

    public function starredChange(Request $request)
    {

        $account_id = $request->input('account_id');
        $starred = $request->input('starred') === 'true' ? 1 : 0;

        $acc = Accounts::find($account_id);

        $acc->starred = $starred;
        $accUpdate = $acc->save();

        return response()->json($acc, 200);

    }

    public function deleteAccounts(Request $request)
    {

        $delIds = $request->delIds;

        Accounts::whereIn('id', $delIds)
            ->update([
                'status' => -1,
            ]);

        return response()->json($delIds, 200);

    }

    public function moveAccounts(Request $request)
    {

        $movIds = $request->movIds;
        $movCat = $request->movCat;
        $movRef = $request->_ref;

        Accounts::whereIn('id', $movIds)
            ->update([
                'category' => $movCat,
                '_ref' => $movRef,
            ]);

        return response()->json($movCat, 200);

    }
}
