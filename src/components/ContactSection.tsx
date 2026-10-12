import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ExternalLink, MessageCircle, ShieldCheck, QrCode, Download, ZoomIn, X, Copy, Check } from 'lucide-react';
import { ContactInquiry } from '../types';

interface ContactSectionProps {
  onInquirySubmitted?: (inquiry: ContactInquiry) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onInquirySubmitted }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState<ContactInquiry | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const upiId = 'Q028343701@ybl';
  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    const newInquiry: ContactInquiry = {
      id: 'INQ-' + Date.now(),
      fullName,
      phone,
      email,
      message,
      submittedAt: new Date().toLocaleString(),
    };

    if (onInquirySubmitted) {
      onInquirySubmitted(newInquiry);
    }

    setSubmittedInquiry(newInquiry);
    setSubmitted(true);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="py-12 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[#8B3A2B] font-bold text-xs uppercase tracking-widest block mb-1">
          Get In Touch
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
          Contact GramBangla Resort
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-stone-100 flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#8B3A2B]/10 text-[#8B3A2B] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-stone-900 text-base">Resort Address</h3>
              <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                Chinchura, Dhaldanga,<br />
                Bankura-722101, West Bengal, India
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-stone-100 flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#8B3A2B]/10 text-[#8B3A2B] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-stone-900 text-base">Direct Phone Lines</h3>
              <div className="mt-2 space-y-1">
                <span className="text-xs text-stone-500 block font-medium">Front Desk & Reservations:</span>
                <a
                  href="tel:+919064485494"
                  className="text-base font-semibold font-mono text-stone-900 hover:text-[#8B3A2B] transition block"
                >
                  +91 90644 85494
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-stone-100 flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#D4AF37]/20 text-[#AA881E] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-stone-900 text-base">Email & Front Desk</h3>
              <a
                href="mailto:grambanglaresortbankura2022@gmail.com"
                className="text-xs sm:text-[13px] text-stone-600 hover:text-[#8B3A2B] mt-1 block transition font-medium break-all"
                title="grambanglaresortbankura2022@gmail.com"
              >
                grambanglaresortbankura2022@gmail.com
              </a>
              <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8B3A2B] shrink-0" />
                <span>Front Desk: 24 Hours Open</span>
              </p>
            </div>
          </div>

          {/* Official UPI Payment QR Card */}
          <div className="bg-gradient-to-br from-white to-[#FAF6F0] rounded-2xl p-5 shadow-sm border border-[#E8DFC8] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#8B3A2B] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm leading-tight">Official UPI Payment QR</h3>
                  <p className="text-[11px] text-stone-500">Scan & pay direct to Resort account</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>

            <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="w-20 h-20 bg-stone-50 rounded-lg border border-stone-200 p-1 shrink-0 overflow-hidden cursor-pointer hover:border-[#8B3A2B] transition group relative"
                title="Tap to enlarge QR"
              >
                <img
                  src="/qr.jpg"
                  alt="Gram Bangla Resort UPI Payment QR"
                  className="w-full h-full object-contain rounded"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </button>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="text-[11px] text-stone-600 truncate">
                  <span className="text-stone-400 block text-[10px]">UPI ID:</span>
                  <strong className="font-mono font-bold text-stone-900 truncate block">{upiId}</strong>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={copyUpiId}
                    className="text-[11px] bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-2 py-1 rounded-md flex items-center gap-1 transition cursor-pointer"
                  >
                    {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-600" />}
                    {copiedUpi ? 'Copied' : 'Copy UPI'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowQrModal(true)}
                    className="text-[11px] bg-[#8B3A2B] hover:bg-[#6D2816] text-white font-bold px-2 py-1 rounded-md flex items-center gap-1 transition cursor-pointer shadow-xs"
                  >
                    <ZoomIn className="w-3 h-3 text-[#D4AF37]" />
                    <span>View QR</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">
            Send Us an Inquiry
          </h2>
          <p className="text-xs text-stone-500 mb-5">
            Your inquiry goes directly to our <strong>Bankura Front Desk Dashboard</strong> & management helpline (+91 90644 85494). We respond within 2 hours.
          </p>

          {submitted && submittedInquiry ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-2xl space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-base font-bold text-emerald-950">
                    Inquiry Sent & Logged Successfully!
                  </strong>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Reference: <span className="font-mono font-bold">{submittedInquiry.id}</span> • Delivered directly to the Resort Front Desk Dashboard.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-200 text-xs text-stone-700 space-y-1">
                <p><strong>Guest:</strong> {submittedInquiry.fullName}</p>
                <p><strong>Contact Phone:</strong> {submittedInquiry.phone}</p>
                {submittedInquiry.message && (
                  <p className="line-clamp-2"><strong>Message:</strong> "{submittedInquiry.message}"</p>
                )}
              </div>

              {/* Instant WhatsApp & Call Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://wa.me/919064485494?text=${encodeURIComponent(
                    `Hello Gram Bangla Resort, I just submitted an inquiry (${submittedInquiry.id}) from ${submittedInquiry.fullName}. Phone: ${submittedInquiry.phone}. Message: ${submittedInquiry.message}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1ebd5a] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Front Desk (9064485494)</span>
                </a>

                <a
                  href="tel:9064485494"
                  className="bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-[#8B3A2B]" />
                  <span>Call Front Desk</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmittedInquiry(null);
                  }}
                  className="text-stone-500 hover:text-stone-800 text-xs font-medium px-3 py-2 transition cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sourav Banerjee"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 90644 85494"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sourav@example.com"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Inquiry Details / Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Inquire about group tour packages, dining arrangements, or sightseeing drivers..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                />
              </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                  <button
                    type="submit"
                    className="bg-[#8B3A2B] hover:bg-[#61261B] text-white font-bold py-3 px-6 rounded-xl shadow-md transition flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    Submit Inquiry
                  </button>

                  <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Delivered to <strong>Resort Admin Dashboard</strong> & Front Desk (+91 90644 85494)</span>
                  </span>
                </div>
              </form>
            )}
        </div>
      </div>

      {/* Embedded Google Maps View with Proper Pin */}
      <div className="mt-12 rounded-3xl overflow-hidden shadow-lg border border-stone-200 relative bg-stone-100">
        <div className="bg-white px-6 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8B3A2B]/10 text-[#8B3A2B] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">Gram Bangla Resort — Location Pin</h4>
              <p className="text-xs text-stone-500">Chinchura, Dhaldanga, Bankura-722101, West Bengal</p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Gram+Bangla+Resort+Bankura+West+Bengal"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#8B3A2B] hover:bg-[#6e2c1e] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <span>Get Directions</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="h-96 w-full relative">
          <iframe
            title="Gram Bangla Resort Location Bankura"
            src="https://maps.google.com/maps?q=Gram%20Bangla%20Resort,%20Bankura,%20West%20Bengal&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Enlarged QR Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B3A2B] block">
                Official Resort UPI QR
              </span>
              <h4 className="font-display font-bold text-lg text-stone-900">
                Gram Bangla Resort & Restaurant
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Scan with Google Pay, PhonePe, Paytm, BHIM, or any UPI app
              </p>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200 flex items-center justify-center my-3">
              <img
                src="/qr.jpg"
                alt="Gram Bangla Resort Official UPI QR"
                className="max-h-72 w-auto object-contain rounded-xl shadow-xs"
              />
            </div>

            <div className="bg-[#FAF6F0] p-2.5 rounded-xl text-xs space-y-1 mb-4 border border-[#E8DFC8]">
              <div className="flex justify-between items-center text-stone-600">
                <span className="text-stone-500">Beneficiary:</span>
                <strong className="text-stone-900 font-semibold">Gram Bangla Resort</strong>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span className="text-stone-500">Official UPI ID:</span>
                <span className="font-mono font-bold text-stone-900 text-xs">{upiId}</span>
              </div>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
