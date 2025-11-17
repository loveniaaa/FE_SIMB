"use client";
import React from "react";

const fakultasData = [
  { value: "filkom", label: "Fakultas Ilmu Komputer" },
  { value: "feb", label: "Fakultas Ekonomi dan Bisnis" },
  { value: "fekep", label: "Fakultas Keperawatan" },
  { value: "fkip", label: "Fakultas Ilmu Kependidikan" },
  { value: "fil", label: "Fakultas Filsafat" },
  { value: "teknik", label: "Fakultas Teknik" },
];

const jurusanData = {
  filkom: [
    { value: "informatika", label: "Informatika" },
    { value: "sistem_informasi", label: "Sistem Informasi" },
  ],
  feb: [
    { value: "akuntansi", label: "Akuntansi" },
    { value: "manajemen", label: "Manajemen" },
  ],
  fekep: [
    { value: "keperawatan", label: "Keperawatan" },
  ],
  fkip: [
    { value: "pendidikan_bahasa", label: "Pendidikan Bahasa" },
  ],
  fil: [
    { value: "teologi", label: "Teologi" },
  ],
  teknik: [
    { value: "teknik_sipil", label: "Teknik Sipil" },
    { value: "arsitektur", label: "Arsitektur" },
  ],
};

const InputOption = ({
  type,
  value,
  onChange,
  selectedFakultas,
}) => {
  const getOptions = () => {
    if (type === "fakultas") {
      return fakultasData;
    } else if (type === "jurusan" && selectedFakultas) {
      return jurusanData[selectedFakultas] || [];
    }
    return [];
  };

  const options = getOptions();

  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        width: "655px",
        height: "35px",
        fontSize: "16px",
        fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
        color: "#020202",
        borderRadius: "6px",
        border: "1px solid #a19999",
        padding: "5px 10px",
      }}
    >
      <option value="">Pilih {type}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default InputOption;
