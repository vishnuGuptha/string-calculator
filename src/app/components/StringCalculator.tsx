"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { add } from "../lib/calculator";

export default function StringCalculator() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleCalculate = () => {
    try {
      const sum = add(input);
      setResult(sum);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-lg bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/40"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          String Calculator
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter numbers separated by commas or custom delimiters.
          <br />
          Example: <code className="text-indigo-600">//;\n1;2</code>
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='e.g. "1,2,3" or "//;\n1;2"'
          rows={3}
          className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition mb-4 text-gray-800 resize-none"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCalculate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition"
        >
          Calculate
        </motion.button>

        <AnimatePresence>
          {result !== null && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 rounded-lg text-green-700"
            >
              Sum: <span className="font-bold text-lg">{result}</span>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg text-red-700"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-gray-500 mt-8 text-center">
          Built with ❤️ using React, TypeScript, and TDD
        </p>
      </motion.div>
    </div>
  );
}
