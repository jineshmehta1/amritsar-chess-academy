"use client";

import React, { useState, useEffect } from "react";
import { Plus, Users, Trash2, Layers } from "lucide-react";

interface Batch {
  id: string;
  name: string;
}

interface Student {
  id: string;
  username: string;
  name: string;
  parentName?: string;
  dob?: string;
  email?: string;
  phone?: string;
  rating?: number;
  batchId?: string;
  batch?: Batch;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);

  // New Student Form State
  const [studentUsername, setStudentUsername] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentParentName, setStudentParentName] = useState("");
  const [studentDob, setStudentDob] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentRating, setStudentRating] = useState("");
  const [studentBatchId, setStudentBatchId] = useState("");
  const [studentError, setStudentError] = useState("");
  const [studentSuccess, setStudentSuccess] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchBatches();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      if (res.ok) setStudents(await res.json());
    } catch (e) {
      console.error("Error fetching students:", e);
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await fetch("/api/batches");
      if (res.ok) setBatches(await res.json());
    } catch (e) {
      console.error("Error fetching batches:", e);
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError("");
    setStudentSuccess("");

    if (!studentUsername || !studentPassword || !studentName) {
      setStudentError("Username, Password, and Full Name are required");
      return;
    }

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: studentUsername,
          password: studentPassword,
          name: studentName,
          parentName: studentParentName,
          dob: studentDob,
          email: studentEmail,
          phone: studentPhone,
          rating: studentRating,
          batchId: studentBatchId || null,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStudentSuccess(`Student "${data.name}" created successfully!`);
        setStudentUsername("");
        setStudentPassword("");
        setStudentName("");
        setStudentParentName("");
        setStudentDob("");
        setStudentEmail("");
        setStudentPhone("");
        setStudentRating("");
        setStudentBatchId("");
        fetchStudents();
      } else {
        setStudentError(data.error || "Failed to create student");
      }
    } catch (e) {
      setStudentError("Failed to create student");
    }
  };

  const handleDeleteStudent = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete student "${name}"?`)) return;
    try {
      const res = await fetch(`/api/students?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchStudents();
      } else {
        alert("Failed to delete student");
      }
    } catch (e) {
      alert("Error deleting student");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Create Student Form */}
      <div className="bg-[#1E1E4F]/40 backdrop-blur-md p-6 rounded-3xl border border-slate-800/80 h-fit space-y-4 shadow-sm">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#FF6B00]" /> Add Student
        </h3>

        {studentError && (
          <div className="p-3 bg-rose-950/60 border border-rose-500/30 text-rose-350 text-xs font-bold rounded-xl text-center">
            {studentError}
          </div>
        )}
        {studentSuccess && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 text-emerald-350 text-xs font-bold rounded-xl text-center">
            {studentSuccess}
          </div>
        )}

        <form onSubmit={handleCreateStudent} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-[#0B0B26] border border-slate-850 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-white font-bold outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Username *
            </label>
            <input
              type="text"
              placeholder="e.g. johndoe"
              value={studentUsername}
              onChange={(e) => setStudentUsername(e.target.value)}
              className="w-full bg-[#0B0B26] border border-slate-850 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-white font-bold outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Password *
            </label>
            <input
              type="password"
              placeholder="Password for login"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              className="w-full bg-[#0B0B26] border border-slate-850 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-white font-bold outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Parent Name
            </label>
            <input
              type="text"
              placeholder="Parent's Name"
              value={studentParentName}
              onChange={(e) => setStudentParentName(e.target.value)}
              className="w-full bg-[#0B0B26] border border-slate-850 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-white font-bold outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Date of Birth
            </label>
            <input
              type="date"
              value={studentDob}
              onChange={(e) => setStudentDob(e.target.value)}
              className="w-full bg-[#0B0B26] border border-slate-850 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-white font-bold outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. student@email.com"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              className="w-full bg-[#0B0B26] border border-slate-850 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-white font-bold outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g. +91 99999 99999"
              value={studentPhone}
              onChange={(e) => setStudentPhone(e.target.value)}
              className="w-full bg-[#0B0B26] border border-slate-850 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-white font-bold outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              FIDE / Local Rating
            </label>
            <input
              type="number"
              placeholder="e.g. 1400"
              value={studentRating}
              onChange={(e) => setStudentRating(e.target.value)}
              className="w-full bg-[#0B0B26] border border-slate-850 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-white font-bold outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Study Batch
            </label>
            <select
              value={studentBatchId}
              onChange={(e) => setStudentBatchId(e.target.value)}
              className="w-full bg-[#0B0B26] border border-slate-850 focus:border-[#FF6B00] rounded-xl p-3 text-xs text-white font-bold outline-none cursor-pointer"
            >
              <option value="">No Batch Assigned</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#FF6B00] hover:bg-[#E66000] text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
          >
            Create Student
          </button>
        </form>
      </div>

      {/* Students List */}
      <div className="lg:col-span-3 bg-[#1E1E4F]/40 backdrop-blur-md p-6 rounded-3xl border border-slate-800/80 space-y-4 shadow-sm">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-[#FF6B00]" /> Active Students
        </h3>

        {students.length === 0 ? (
          <div className="p-8 text-center text-slate-450 text-xs font-bold border border-slate-800 rounded-2xl bg-[#0B0B26]/30">
            No students created yet.
          </div>
        ) : (
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#0B0B26]/60 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#1E1E4F]/60 border-b border-slate-800 text-slate-300 font-bold uppercase tracking-wider">
                  <th className="p-4">Name</th>
                  <th className="p-4">Username</th>
                  <th className="p-4">Parent Name</th>
                  <th className="p-4">DOB</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4 text-center">Rating</th>
                  <th className="p-4">Assigned Batch</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-semibold text-slate-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-[#1E1E4F]/30 transition-colors">
                    <td className="p-4 text-white font-bold">{student.name}</td>
                    <td className="p-4 text-slate-400">{student.username}</td>
                    <td className="p-4 text-slate-400">{student.parentName || "-"}</td>
                    <td className="p-4 text-slate-400">{student.dob || "-"}</td>
                    <td className="p-4 text-slate-400">
                      <div>{student.email || "-"}</div>
                      <div className="text-[10px] text-slate-500">{student.phone || ""}</div>
                    </td>
                    <td className="p-4 text-center text-slate-200 font-extrabold">{student.rating || 0}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-[10px] font-bold">
                        {student.batch?.name || "Unassigned"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDeleteStudent(student.id, student.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-950/40 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
