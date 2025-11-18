<?php

namespace App\Http\Controllers;

use App\Models\pegawai;
use Illuminate\Http\Request;

class PegawaiController extends Controller
{

    public function index()
    {
        $pegawais = Pegawai::all();
        return response()->json($pegawais);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'gaji' => 'required|integer',
        ]);

        $pegawai = Pegawai::create($validated);

        return response()->json([
            'message' => 'Data ppegawai berhasil ditambahkan.',
            'data' => $pegawai,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $pegawai = Pegawai::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'gaji' => 'required|integer',
        ]);

        $pegawai->update($validated);

        return response()->json([
            'message' => 'Data pegawai berhasil diperbarui.',
            'data' => $pegawai
        ]);

    }

    public function destroy($id)
    {
        $pegawai = Pegawai::findOrFail($id);
        $pegawai->delete();

        return response()->json([
            'message' => 'Data pegawai berhasil dihapus.'
        ]);
    }
}
