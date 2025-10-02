import { useState } from "react";

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Message envoyé :', form);
    };
    return (
<form
  onSubmit={handleSubmit}
  className="bg-gradient-to-r from-black to-gray-800 border border-gray-700 rounded-xl shadow-sm p-6 max-w-xl mx-auto space-y-4"
>
  <input
    name="name"
    type="text"
    placeholder="Votre nom"
    required
    className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
    onChange={handleChange}
  />
  <input
    name="email"
    type="email"
    placeholder="Votre email"
    required
    className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
    onChange={handleChange}
  />
  <textarea
    name="message"
    placeholder="Votre message"
    rows={4}
    required
    className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
    onChange={handleChange}
  />
  <button
    type="submit"
    className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
  >
    Envoyer
  </button>
</form>

    );
}