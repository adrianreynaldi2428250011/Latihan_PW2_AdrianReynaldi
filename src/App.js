import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [pegawais, setPegawais] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    jabatan: "",
    gaji: "",
  });

  const apiUrl = "http://127.0.0.1:8000/api/pegawai";

  const getPegawais = async () => {
    try {
      const res = await axios.get(apiUrl);
      setPegawais(res.data);
    } catch (err) {
      console.error("Gagal memuat data", err);
    }
  };

  useEffect(() => {
    getPegawais();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(apiUrl, form);
    setForm({ nama: "", jabatan: "", gaji: "" });
    getPegawais();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    getPegawais();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manajemen Pegawai</h1>

      <h2>Tambah Pegawai</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nama"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        /><br />
        <input
          placeholder="Jabatan"
          value={form.jabatan}
          onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
        /><br />
        <input
          placeholder="Gaji"
          value={form.gaji}
          onChange={(e) => setForm({ ...form, gaji: e.target.value })}
        /><br />
        <button type="submit">Tambah</button>
      </form>

      <h2>Daftar Pegawai</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Gaji</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pegawais.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.nama}</td>
              <td>{p.jabatan}</td>
              <td>{p.gaji}</td>
              <td>
                <button onClick={() => handleDelete(p.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
