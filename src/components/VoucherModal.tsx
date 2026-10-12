import React, { useState } from 'react';
import { X, CheckCircle2, MapPin, Phone, ShieldCheck, Download, Share2, Check } from 'lucide-react';
import { BookingRecord } from '../types';
import { GramBanglaLogo } from './GramBanglaLogo';

interface VoucherModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ booking, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!booking) return null;

  // Standalone formatted HTML document for download
  const getVoucherHtml = (b: BookingRecord) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Gram Bangla Resort - Voucher ${b.refCode}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; color: #1c1917; background: #FAF6F0; margin: 0; padding: 24px 12px; }
    .voucher-card { max-width: 680px; margin: 0 auto; border: 2px solid #8B3A2B; border-radius: 16px; padding: 28px; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { text-align: center; border-bottom: 2px dashed #e7e5e4; padding-bottom: 18px; margin-bottom: 18px; }
    .sub-title { font-size: 11px; color: #8B3A2B; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; }
    .logo-title { font-family: 'Cinzel', Georgia, serif; font-size: 24px; font-weight: 800; color: #1E3A2B; letter-spacing: 1px; margin: 4px 0; }
    .doc-title { font-size: 17px; font-weight: 700; color: #292524; margin: 6px 0 2px; }
    .ref-badge { display: inline-block; background: #FAF6F0; border: 1px solid #8B3A2B; color: #8B3A2B; font-family: monospace; font-size: 13px; font-weight: bold; padding: 4px 12px; border-radius: 8px; margin-top: 6px; }
    .status-badge { display: inline-block; background: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-left: 6px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
    .info-box { background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 12px 14px; }
    .info-label { font-size: 10px; text-transform: uppercase; color: #78716c; font-weight: 600; margin-bottom: 2px; }
    .info-val { font-size: 13px; font-weight: 700; color: #1c1917; }
    .pricing-box { background: #FAF6F0; border: 1px solid #8B3A2B; border-radius: 12px; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
    .price-total { font-size: 22px; font-weight: 800; color: #8B3A2B; font-family: 'Cinzel', Georgia, serif; }
    .rules-box { font-size: 10.5px; color: #57534e; border-top: 1px solid #e7e5e4; padding-top: 12px; margin-top: 12px; line-height: 1.5; }
    .rules-box p { margin: 3px 0; }
    .footer-notes { text-align: center; font-size: 10px; color: #a8a29e; margin-top: 16px; }
    .print-btn-bar { text-align: center; margin-bottom: 16px; }
    .btn-print { background: #1E3A2B; color: #fff; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer; font-size: 13px; }
    @media print { .print-btn-bar { display: none; } body { background: #fff; padding: 0; } .voucher-card { box-shadow: none; border-color: #8B3A2B; } }
  </style>
</head>
<body>
  <div class="print-btn-bar">
    <button class="btn-print" onclick="window.print()">🖨️ Click to Print / Save as PDF</button>
  </div>
  <div class="voucher-card">
    <div class="header">
      <img src="/images/logo.jpeg" alt="Gram Bangla Resort" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid #8B3A2B; margin-bottom: 8px; display: inline-block;" />
      <div class="sub-title">AUTHENTIC BENGALI HERITAGE RESORT • BANKURA</div>
      <div class="logo-title">GRAM BANGLA RESORT</div>
      <div class="doc-title">Official Reservation Voucher</div>
      <div>
        <span class="ref-badge">Ref: ${b.refCode}</span>
        <span class="status-badge">✔ ${b.status}</span>
      </div>
    </div>

    <div class="grid-2">
      <div class="info-box">
        <div class="info-label">Primary Guest</div>
        <div class="info-val">${b.name}</div>
        <div style="font-size: 11px; color: #57534e; margin-top: 3px;">Phone: ${b.phone}</div>
        <div style="font-size: 11px; color: #57534e;">ID Proof: ${b.idType}</div>
      </div>

      <div class="info-box">
        <div class="info-label">Room Accommodated</div>
        <div class="info-val">${b.roomTitle}</div>
        <div style="font-size: 11px; color: #57534e; margin-top: 3px;">Guests: ${b.adults} Adult(s)${b.children > 0 ? `, ${b.children} Child` : ''}</div>
        <div style="font-size: 11px; color: #57534e;">Duration: ${b.nights} Night(s)</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="info-box">
        <div class="info-label">Check-in Date & Time</div>
        <div class="info-val">${b.checkin}</div>
        <div style="font-size: 11px; color: #047857; font-weight: bold; margin-top: 2px;">Standard Check-in: 11:00 AM</div>
      </div>

      <div class="info-box">
        <div class="info-label">Check-out Date & Time</div>
        <div class="info-val">${b.checkout}</div>
        <div style="font-size: 11px; color: #b45309; font-weight: bold; margin-top: 2px;">Standard Check-out: 10:00 AM</div>
      </div>
    </div>

    <div class="pricing-box">
      <div>
        <div style="font-size: 11px; font-weight: bold; color: #44403c;">TOTAL PRICE (INCL. GST)</div>
        <div style="font-size: 10px; color: #78716c; margin-top: 2px;">Payment: Instant UPI Online</div>
        ${b.utrNumber ? `<div style="font-size: 10px; font-family: monospace; color: #44403c; margin-top: 2px;">UPI UTR: ${b.utrNumber}</div>` : ''}
      </div>
      <div class="price-total">₹${b.total.toLocaleString()}</div>
    </div>

    ${b.specialRequests ? `
      <div class="info-box" style="margin-bottom: 12px;">
        <div class="info-label">Special Requests</div>
        <div style="font-size: 11.5px; color: #292524;">${b.specialRequests}</div>
      </div>
    ` : ''}

    <div class="rules-box">
      <p><strong>• Check-in Policy:</strong> Please produce this confirmation voucher alongside valid Government Photo ID at the resort reception.</p>
      <p><strong>• Location:</strong> Gram Bangla Resort, Chinchura, Dhaldanga, Bankura - 722101, West Bengal.</p>
      <p><strong>• Room Service & 24/7 Front Desk:</strong> 9064485494 (+91 90644 85494)</p>
    </div>

    <div class="footer-notes">
      This is an official computer-generated confirmation voucher issued by Gram Bangla Resort Management System.
    </div>
  </div>
</body>
</html>`;

  // Direct 1-Click File Download
  const handleDownload = () => {
    try {
      const htmlContent = getVoucherHtml(booking);
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `GramBangla_Voucher_${booking.refCode}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  const handleShareOrCopy = () => {
    const summary = `Gram Bangla Resort Booking Voucher\nRef: ${booking.refCode}\nGuest: ${booking.name}\nRoom: ${booking.roomTitle}\nDates: ${booking.checkin} to ${booking.checkout}\nTotal: ₹${booking.total.toLocaleString()}`;
    navigator.clipboard.writeText(summary);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        id="printable-voucher"
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden my-8 p-6 sm:p-8 space-y-6 border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Prominent Cross / Close Button (hidden during print) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Voucher"
          className="no-print absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 flex items-center justify-center border border-stone-300 shadow-sm transition cursor-pointer z-30"
          title="Close voucher (Esc)"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Voucher Header */}
        <div className="text-center border-b border-stone-200 pb-5">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-2 shadow-sm bg-white border-2 border-[#D4AF37]/50">
            <GramBanglaLogo variant="badge" className="w-full h-full" />
          </div>
          <span className="text-[11px] uppercase font-bold text-[#8B3A2B] tracking-widest block">
            Gram Bangla Hotel & Resort
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Booking Confirmation Voucher
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Bankura District, West Bengal • Reference Code:{' '}
            <strong className="text-[#8B3A2B] font-mono text-sm">{booking.refCode}</strong>
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {booking.status}
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* Guest & Room */}
          <div className="bg-stone-50 p-4 rounded-2xl grid grid-cols-2 gap-3 border border-stone-200/70">
            <div>
              <span className="text-stone-500 text-[11px] block">Primary Guest:</span>
              <strong className="text-stone-900 font-semibold">{booking.name}</strong>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Contact Number:</span>
              <strong className="text-stone-900 font-semibold font-mono">{booking.phone}</strong>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Reserved Room:</span>
              <strong className="text-stone-900 font-semibold">{booking.roomTitle}</strong>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Guests:</span>
              <strong className="text-stone-900 font-semibold">
                {booking.adults} Adult{booking.adults > 1 ? 's' : ''}
                {booking.children > 0 ? `, ${booking.children} Child${booking.children > 1 ? 'ren' : ''}` : ''}
              </strong>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-stone-50 p-4 rounded-2xl grid grid-cols-2 gap-3 border border-stone-200/70">
            <div>
              <span className="text-stone-500 text-[11px] block">Check-in Date:</span>
              <strong className="text-stone-900 font-semibold">{booking.checkin} (11:00 AM)</strong>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Check-out Date:</span>
              <strong className="text-stone-900 font-semibold">{booking.checkout} (10:00 AM)</strong>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Total Duration:</span>
              <strong className="text-stone-900 font-semibold">{booking.nights} Night(s)</strong>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">ID Verification:</span>
              <strong className="text-stone-900 font-semibold">{booking.idType}</strong>
            </div>
          </div>

          {/* Amount Paid / Payable */}
          <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#8B3A2B]/20 flex justify-between items-center">
            <div>
              <span className="text-xs text-stone-600 block">
                Total Price (incl. 12% GST):
              </span>
              <span className="text-[11px] text-stone-500 block">
                Payment Mode: <strong>Instant UPI</strong>
              </span>
              {booking.utrNumber && (
                <span className="text-[11px] font-mono text-stone-600 block mt-0.5">
                  UPI UTR / Ref: <strong>{booking.utrNumber}</strong>
                </span>
              )}
            </div>
            <strong className="font-display text-2xl text-[#8B3A2B] font-bold">
              ₹{booking.total.toLocaleString()}
            </strong>
          </div>

          {booking.specialRequests && (
            <div className="p-3 bg-stone-50 rounded-xl text-xs border border-stone-200">
              <span className="text-stone-500 block font-semibold">Special Requests:</span>
              <p className="text-stone-700 mt-0.5">{booking.specialRequests}</p>
            </div>
          )}

          {/* Terms & Instructions */}
          <div className="text-[11px] text-stone-500 space-y-1.5 pt-2">
            <p className="flex items-start gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B3A2B] shrink-0 mt-0.5" />
              <span>
                Please present this voucher alongside an original government ID proof ({booking.idType}) at the reception counter during check-in.
              </span>
            </p>
            <p className="flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#8B3A2B] shrink-0 mt-0.5" />
              <span>Chinchura, Dhaldanga, Bankura-722101, West Bengal</span>
            </p>
            <p className="flex items-start gap-1">
              <Phone className="w-3.5 h-3.5 text-[#8B3A2B] shrink-0 mt-0.5" />
              <span>Room Service & Front Desk: <strong className="text-stone-700 font-mono">9064485494</strong> (+91 90644 85494)</span>
            </p>
          </div>
        </div>

        {/* Action Buttons (no-print) */}
        <div className="space-y-2.5 pt-3 no-print">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="bg-[#1E3A2B] hover:bg-[#0F2017] text-white font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" /> Download Voucher
            </button>
            
            <button
              type="button"
              onClick={handleShareOrCopy}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3.5 px-4 rounded-xl transition text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5 border border-stone-200"
            >
              {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4 text-stone-600" />}
              {copiedLink ? 'Copied!' : 'Copy Summary'}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            Close Voucher & Return to Website
          </button>
        </div>
      </div>
    </div>
  );
};
