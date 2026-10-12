/**
 * InVois - Pure HTML5 Offline Invoice Generator
 * Client-side Data Management, Dwi-Bahasa (Per-Invoice), & Calculations
 */

(function () {
  'use strict';

  // Storage Key
  const STORAGE_KEY = 'invois_app_data_v1';
  const DEFAULT_QR_PATH = 'assets/aeon-qr-sample.svg';

  // Bilingual Dictionary (Pure language, no mixing)
  const I18N = {
    ms: {
      langCode: 'ms',
      langName: 'Bahasa Melayu',
      docTitle: 'INVOIS',
      recipientLabel: 'KEPADA',
      dateLabel: 'TARIKH:',
      dueDateLabel: 'TARIKH TAMAT:',
      colDesc: 'PENERANGAN',
      colQty: 'KUANTITI',
      colPrice: 'SEUNIT (RM)',
      colAmount: 'JUMLAH (RM)',
      lblSubtotal: 'Subjumlah:',
      lblGrandTotal: 'Jumlah:',
      lblPaid: 'Jumlah Dibayar:',
      lblBalanceDue: 'Baki Perlu Dibayar:',
      paymentTitle: 'BUTIRAN PEMBAYARAN',
      lblBankName: 'Nama Bank:',
      lblAccountNo: 'No. Akaun:',
      lblAccountName: 'Nama Akaun:',
      lblIdNo: 'No. K/P:',
      footerText: 'TERIMA KASIH ATAS URUSAN ANDA',
      defaultNewItemDesc: 'Penerangan perkhidmatan baru',
      defaultClientName: 'Nama Pelanggan Baru Sdn Bhd'
    },
    en: {
      langCode: 'en',
      langName: 'English',
      docTitle: 'INVOICE',
      recipientLabel: 'BILLED TO',
      dateLabel: 'DATE:',
      dueDateLabel: 'DUE DATE:',
      colDesc: 'DESCRIPTION',
      colQty: 'QUANTITY',
      colPrice: 'UNIT (RM)',
      colAmount: 'TOTAL (RM)',
      lblSubtotal: 'Subtotal:',
      lblGrandTotal: 'Total:',
      lblPaid: 'Amount Paid:',
      lblBalanceDue: 'Balance Due:',
      paymentTitle: 'PAYMENT DETAILS',
      lblBankName: 'Bank Name:',
      lblAccountNo: 'Account No:',
      lblAccountName: 'Account Name:',
      lblIdNo: 'ID / IC No:',
      footerText: 'THANK YOU FOR YOUR BUSINESS',
      defaultNewItemDesc: 'New service description',
      defaultClientName: 'New Client Company Ltd'
    }
  };

  // Sample Invoice Data (Default Bahasa Melayu, Normal Wording)
  const SAMPLE_INVOICE = {
    id: 'inv_156355_isgs',
    language: 'ms',
    title: 'INVOIS',
    invoiceNumber: '#INV-156355-ISGS',
    sender: {
      name: 'Nur Asmawi Subri',
      addressLine1: 'Blok J-10-6, Desa Setia Wira, Jalan Buku 5,',
      addressLine2: '54000 Dato Keramat, Kuala Lumpur',
      phone: 'Tel: 601111458944',
      email: 'E-mel: maui@sabily.info'
    },
    recipient: {
      label: 'KEPADA',
      name: 'Bespoke Intergrated Sdn Bhd',
      addressLine1: 'No 6A, Jalan 4/12B, Seksyen 4 Tambahan, Bandar Baru',
      addressLine2: 'Bangi, 43650 Selangor',
      phone: 'Tel: 60121234567',
      email: 'E-mel: noreply@bespoke.my'
    },
    dates: {
      invoiceDate: '8/3/2026',
      dueDate: '8/3/2026'
    },
    items: [
      {
        id: 'item_1',
        description: 'Tenaga Pengajar LZNK',
        quantity: 4.00,
        unitPrice: 1500.00,
        amount: 6000.00
      },
      {
        id: 'item_2',
        description: 'Pembangunan Sistem ZakatAnda',
        quantity: 1.00,
        unitPrice: 400.00,
        amount: 400.00
      },
      {
        id: 'item_3',
        description: 'Pembangunan Sistem Pios',
        quantity: 1.00,
        unitPrice: 100.00,
        amount: 100.00
      }
    ],
    totals: {
      subtotal: 6500.00,
      total: 6500.00,
      amountPaid: 0.00,
      balanceDue: 6500.00
    },
    paymentDetails: {
      title: 'BUTIRAN PEMBAYARAN',
      bankName: 'AEON Bank',
      accountNumber: '9988555603677',
      accountName: 'Nur Asmawi Subri',
      idNumber: '840724-02-5433',
      qrCodeUrl: DEFAULT_QR_PATH
    },
    footer: {
      text: 'TERIMA KASIH ATAS URUSAN ANDA'
    },
    createdAt: '2026-03-08T10:00:00.000Z',
    updatedAt: '2026-03-08T10:00:00.000Z'
  };

  // Embedded Fallback Multi-Sample Data (Ensures loading never fails even on file:// protocol or offline)
  const MULTI_SAMPLE_FALLBACK = {
    version: "1.0",
    invoices: [
      {
        id: "inv_001_original",
        language: "ms",
        title: "INVOIS",
        invoiceNumber: "#INV-156355-ISGS",
        sender: {
          name: "Nur Asmawi Subri",
          addressLine1: "Blok J-10-6, Desa Setia Wira, Jalan Buku 5,",
          addressLine2: "54000 Dato Keramat, Kuala Lumpur",
          phone: "Tel: 601111458944",
          email: "E-mel: maui@sabily.info"
        },
        recipient: {
          label: "KEPADA",
          name: "Bespoke Intergrated Sdn Bhd",
          addressLine1: "No 6A, Jalan 4/12B, Seksyen 4 Tambahan, Bandar Baru",
          addressLine2: "Bangi, 43650 Selangor",
          phone: "Tel: 60121234567",
          email: "E-mel: noreply@bespoke.my"
        },
        dates: {
          invoiceDate: "8/3/2026",
          dueDate: "8/3/2026"
        },
        items: [
          {
            id: "item_1",
            description: "Tenaga Pengajar LZNK",
            quantity: 4.0,
            unitPrice: 1500.0,
            amount: 6000.0
          },
          {
            id: "item_2",
            description: "Pembangunan Sistem ZakatAnda",
            quantity: 1.0,
            unitPrice: 400.0,
            amount: 400.0
          },
          {
            id: "item_3",
            description: "Pembangunan Sistem Pios",
            quantity: 1.0,
            unitPrice: 100.0,
            amount: 100.0
          }
        ],
        totals: {
          subtotal: 6500.0,
          total: 6500.0,
          amountPaid: 0.0,
          balanceDue: 6500.0
        },
        paymentDetails: {
          title: "BUTIRAN PEMBAYARAN",
          bankName: "AEON Bank",
          accountNumber: "9988555603677",
          accountName: "Nur Asmawi Subri",
          idNumber: "840724-02-5433",
          qrCodeUrl: DEFAULT_QR_PATH
        },
        footer: {
          text: "TERIMA KASIH ATAS URUSAN ANDA"
        }
      },
      {
        id: "inv_002_duplicate_en",
        language: "en",
        title: "INVOICE",
        invoiceNumber: "#INV-156355-ISGS (English)",
        sender: {
          name: "Nur Asmawi Subri",
          addressLine1: "Block J-10-6, Desa Setia Wira, Jalan Buku 5,",
          addressLine2: "54000 Dato Keramat, Kuala Lumpur",
          phone: "Tel: 601111458944",
          email: "Email: maui@sabily.info"
        },
        recipient: {
          label: "BILLED TO",
          name: "Bespoke Intergrated Sdn Bhd",
          addressLine1: "No 6A, Jalan 4/12B, Seksyen 4 Tambahan, Bandar Baru",
          addressLine2: "Bangi, 43650 Selangor",
          phone: "Tel: 60121234567",
          email: "Email: noreply@bespoke.my"
        },
        dates: {
          invoiceDate: "15/3/2026",
          dueDate: "15/3/2026"
        },
        items: [
          {
            id: "item_1",
            description: "Lead Instructor LZNK Phase 2",
            quantity: 2.0,
            unitPrice: 1500.0,
            amount: 3000.0
          }
        ],
        totals: {
          subtotal: 3000.0,
          total: 3000.0,
          amountPaid: 1000.0,
          balanceDue: 2000.0
        },
        paymentDetails: {
          title: "PAYMENT DETAILS",
          bankName: "AEON Bank",
          accountNumber: "9988555603677",
          accountName: "Nur Asmawi Subri",
          idNumber: "840724-02-5433",
          qrCodeUrl: DEFAULT_QR_PATH
        },
        footer: {
          text: "THANK YOU FOR YOUR BUSINESS"
        }
      },
      {
        id: "inv_003_samename_ms",
        language: "ms",
        title: "INVOIS",
        invoiceNumber: "#INV-156355-ISGS",
        sender: {
          name: "Nur Asmawi Subri",
          addressLine1: "Blok J-10-6, Desa Setia Wira, Jalan Buku 5,",
          addressLine2: "54000 Dato Keramat, Kuala Lumpur",
          phone: "Tel: 601111458944",
          email: "E-mel: maui@sabily.info"
        },
        recipient: {
          label: "KEPADA",
          name: "Bespoke Intergrated Sdn Bhd",
          addressLine1: "No 6A, Jalan 4/12B, Seksyen 4 Tambahan, Bandar Baru",
          addressLine2: "Bangi, 43650 Selangor",
          phone: "Tel: 60121234567",
          email: "E-mel: noreply@bespoke.my"
        },
        dates: {
          invoiceDate: "22/3/2026",
          dueDate: "22/3/2026"
        },
        items: [
          {
            id: "item_1",
            description: "Penyelenggaraan Bulanan Pelayan Cloud",
            quantity: 1.0,
            unitPrice: 850.0,
            amount: 850.0
          }
        ],
        totals: {
          subtotal: 850.0,
          total: 850.0,
          amountPaid: 850.0,
          balanceDue: 0.0
        },
        paymentDetails: {
          title: "BUTIRAN PEMBAYARAN",
          bankName: "AEON Bank",
          accountNumber: "9988555603677",
          accountName: "Nur Asmawi Subri",
          idNumber: "840724-02-5433",
          qrCodeUrl: DEFAULT_QR_PATH
        },
        footer: {
          text: "TERIMA KASIH ATAS URUSAN ANDA"
        }
      }
    ]
  };

  // Helper to safely load multi-sample data from file or embedded fallback
  async function loadMultiSampleData() {
    try {
      const resp = await fetch(`data/multi-sample.json?t=${Date.now()}`, { cache: 'no-store' });
      if (resp && resp.ok) {
        const data = await resp.json();
        if (data && Array.isArray(data.invoices)) {
          return data;
        }
      }
    } catch (e) {
      console.warn('Network or file:// fetch failed, using embedded multi-sample data:', e);
    }
    return JSON.parse(JSON.stringify(MULTI_SAMPLE_FALLBACK));
  }

  // State
  let appState = {
    activeInvoiceId: SAMPLE_INVOICE.id,
    invoices: [JSON.parse(JSON.stringify(SAMPLE_INVOICE))]
  };

  // DOM Elements Cache
  const els = {
    // Header & Controls
    btnTriggerLoad: document.getElementById('btnTriggerLoad'),
    btnSaveJson: document.getElementById('btnSaveJson'),
    btnOpenDataManager: document.getElementById('btnOpenDataManager'),
    btnNewInvoice: document.getElementById('btnNewInvoice'),
    btnPrintPdf: document.getElementById('btnPrintPdf'),
    badgeInvoiceCount: document.getElementById('badgeInvoiceCount'),
    btnSaveToStorage: document.getElementById('btnSaveToStorage'),
    btnResetSample: document.getElementById('btnResetSample'),
    jsonFileInput: document.getElementById('jsonFileInput'),
    qrFileInput: document.getElementById('qrFileInput'),
    toastContainer: document.getElementById('toastContainer'),

    // Language Toggle Buttons
    btnLangMs: document.getElementById('btnLangMs'),
    btnLangEn: document.getElementById('btnLangEn'),

    // Paper Fields
    docTitle: document.getElementById('docTitle'),
    docInvoiceNumber: document.getElementById('docInvoiceNumber'),
    senderName: document.getElementById('senderName'),
    senderAddress1: document.getElementById('senderAddress1'),
    senderAddress2: document.getElementById('senderAddress2'),
    senderPhone: document.getElementById('senderPhone'),
    senderEmail: document.getElementById('senderEmail'),

    recipientLabel: document.getElementById('recipientLabel'),
    recipientName: document.getElementById('recipientName'),
    recipientAddress1: document.getElementById('recipientAddress1'),
    recipientAddress2: document.getElementById('recipientAddress2'),
    recipientPhone: document.getElementById('recipientPhone'),
    recipientEmail: document.getElementById('recipientEmail'),

    lblInvoiceDate: document.getElementById('lblInvoiceDate'),
    invoiceDate: document.getElementById('invoiceDate'),
    lblDueDate: document.getElementById('lblDueDate'),
    dueDate: document.getElementById('dueDate'),

    // Table
    itemsTableBody: document.getElementById('itemsTableBody'),
    btnAddRow: document.getElementById('btnAddRow'),
    thColDesc: document.getElementById('thColDesc'),
    thColQty: document.getElementById('thColQty'),
    thColPrice: document.getElementById('thColPrice'),
    thColAmount: document.getElementById('thColAmount'),

    // Totals
    lblSubtotal: document.getElementById('lblSubtotal'),
    valSubtotal: document.getElementById('valSubtotal'),
    lblGrandTotal: document.getElementById('lblGrandTotal'),
    valGrandTotal: document.getElementById('valGrandTotal'),
    lblPaid: document.getElementById('lblPaid'),
    inputPaid: document.getElementById('inputPaid'),
    lblBalanceDue: document.getElementById('lblBalanceDue'),
    valBalanceDue: document.getElementById('valBalanceDue'),

    // Payment Box
    paymentTitle: document.getElementById('paymentTitle'),
    lblBankName: document.getElementById('lblBankName'),
    bankName: document.getElementById('bankName'),
    lblAccountNo: document.getElementById('lblAccountNo'),
    accountNumber: document.getElementById('accountNumber'),
    lblAccountName: document.getElementById('lblAccountName'),
    accountName: document.getElementById('accountName'),
    lblIdNo: document.getElementById('lblIdNo'),
    idNumber: document.getElementById('idNumber'),
    qrContainer: document.getElementById('qrContainer'),
    qrImage: document.getElementById('qrImage'),
    btnResetQr: document.getElementById('btnResetQr'),

    footerText: document.getElementById('footerText'),

    // Modal Elements
    dataManagerModal: document.getElementById('dataManagerModal'),
    btnCloseDataManager: document.getElementById('btnCloseDataManager'),
    btnCloseDataManagerBottom: document.getElementById('btnCloseDataManagerBottom'),
    dataSearchInput: document.getElementById('dataSearchInput'),
    btnModalTriggerUpload: document.getElementById('btnModalTriggerUpload'),
    btnSaveCurrentToList: document.getElementById('btnSaveCurrentToList'),
    invoicesList: document.getElementById('invoicesList'),
    dataManagerSummaryText: document.getElementById('dataManagerSummaryText'),
    btnDownloadAllJson: document.getElementById('btnDownloadAllJson')
  };

  /**
   * Helper: Unique ID generator
   */
  function generateId(prefix = 'inv') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  }

  /**
   * Helper: Format number to 2 decimal places e.g. 1500.00
   */
  function formatMoney(num) {
    const val = parseFloat(num);
    if (isNaN(val)) return '0.00';
    return val.toFixed(2);
  }

  /**
   * Show clean Toast Notification
   */
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : ''}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    els.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /**
   * Load state from localStorage or initialize with sample
   */
  function initStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.invoices) && parsed.invoices.length > 0) {
          // Normalize languages & migrate sample data on existing stored invoices
          parsed.invoices.forEach(inv => {
            if (!inv.language) inv.language = 'ms';
            if (inv.sender && (inv.sender.phone === 'Tel: 0182405894' || inv.sender.phone === '0182405894' || inv.sender.phone === 'Tel: 01111458944' || inv.sender.phone === '01111458944')) {
              inv.sender.phone = 'Tel: 601111458944';
            }
            if (inv.recipient && (inv.recipient.phone === 'Tel: 60172388058' || inv.recipient.phone === '60172388058' || !inv.recipient.phone)) {
              inv.recipient.phone = 'Tel: 60121234567';
            }
            if (inv.recipient && (inv.recipient.email === 'E-mel: info@bespoke.com.my' || inv.recipient.email === 'Email: info@bespoke.com.my' || !inv.recipient.email)) {
              inv.recipient.email = (inv.language === 'en') ? 'Email: noreply@bespoke.my' : 'E-mel: noreply@bespoke.my';
            }
          });
          appState = parsed;
          saveStateToStorage();
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse localStorage data:', e);
    }

    // Default initialization
    appState = {
      activeInvoiceId: SAMPLE_INVOICE.id,
      invoices: [JSON.parse(JSON.stringify(SAMPLE_INVOICE))]
    };
    saveStateToStorage();
  }

  /**
   * Persist state to localStorage
   */
  function saveStateToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      updateBadgeCount();
    } catch (e) {
      console.error('Storage quota exceeded or error:', e);
    }
  }

  /**
   * Get Active Invoice Object
   */
  function getActiveInvoice() {
    let inv = appState.invoices.find(i => i.id === appState.activeInvoiceId);
    if (!inv) {
      if (appState.invoices.length > 0) {
        inv = appState.invoices[0];
        appState.activeInvoiceId = inv.id;
      } else {
        inv = JSON.parse(JSON.stringify(SAMPLE_INVOICE));
        inv.id = generateId('inv');
        appState.invoices.push(inv);
        appState.activeInvoiceId = inv.id;
      }
    }
    if (!inv.language) inv.language = 'ms';
    return inv;
  }

  /**
   * Update active invoice counter badge in toolbar
   */
  function updateBadgeCount() {
    if (els.badgeInvoiceCount) {
      els.badgeInvoiceCount.textContent = appState.invoices.length;
    }
  }

  /**
   * Apply language dictionary to document labels
   */
  function applyLanguageToDocument(lang = 'ms', isManualSwitch = false) {
    const t = I18N[lang] || I18N.ms;
    const inv = getActiveInvoice();

    // Static labels
    if (els.lblInvoiceDate) els.lblInvoiceDate.textContent = t.dateLabel;
    if (els.lblDueDate) els.lblDueDate.textContent = t.dueDateLabel;
    if (els.thColDesc) els.thColDesc.textContent = t.colDesc;
    if (els.thColQty) els.thColQty.textContent = t.colQty;
    if (els.thColPrice) els.thColPrice.innerHTML = t.colPrice;
    if (els.thColAmount) els.thColAmount.textContent = t.colAmount;
    if (els.lblSubtotal) els.lblSubtotal.textContent = t.lblSubtotal;
    if (els.lblGrandTotal) els.lblGrandTotal.textContent = t.lblGrandTotal;
    if (els.lblPaid) els.lblPaid.textContent = t.lblPaid;
    if (els.lblBalanceDue) els.lblBalanceDue.textContent = t.lblBalanceDue;
    if (els.lblBankName) els.lblBankName.textContent = t.lblBankName;
    if (els.lblAccountNo) els.lblAccountNo.textContent = t.lblAccountNo;
    if (els.lblAccountName) els.lblAccountName.textContent = t.lblAccountName;
    if (els.lblIdNo) els.lblIdNo.textContent = t.lblIdNo;

    // Document header titles: update if manual switch or default matching
    if (isManualSwitch || !inv.title || inv.title === 'INVOICE' || inv.title === 'INVOIS') {
      els.docTitle.textContent = t.docTitle;
      inv.title = t.docTitle;
    }
    if (isManualSwitch || !inv.recipient?.label || inv.recipient.label === 'KEPADA' || inv.recipient.label === 'BILLED TO' || inv.recipient.label === 'K E P A D A') {
      els.recipientLabel.textContent = t.recipientLabel;
      if (inv.recipient) inv.recipient.label = t.recipientLabel;
    }
    if (isManualSwitch || !inv.paymentDetails?.title || inv.paymentDetails.title === 'PAYMENT DETAILS' || inv.paymentDetails.title === 'BUTIRAN PEMBAYARAN' || inv.paymentDetails.title === 'P A Y M E N T   D E T A I L S') {
      els.paymentTitle.textContent = t.paymentTitle;
      if (inv.paymentDetails) inv.paymentDetails.title = t.paymentTitle;
    }
    if (isManualSwitch || !inv.footer?.text || inv.footer.text === 'THANK YOU FOR YOUR BUSINESS' || inv.footer.text === 'TERIMA KASIH ATAS URUSAN ANDA' || inv.footer.text === 'T H A N K   Y O U   F O R   Y O U R   B U S I N E S S') {
      els.footerText.textContent = t.footerText;
      if (inv.footer) inv.footer.text = t.footerText;
    }

    // Update Language UI Toggle buttons
    if (els.btnLangMs && els.btnLangEn) {
      if (lang === 'en') {
        els.btnLangEn.classList.add('active');
        els.btnLangMs.classList.remove('active');
      } else {
        els.btnLangMs.classList.add('active');
        els.btnLangEn.classList.remove('active');
      }
    }
  }

  /**
   * Switch Language for the Active Invoice
   */
  function setInvoiceLanguage(lang) {
    const inv = getActiveInvoice();
    inv.language = lang;
    applyLanguageToDocument(lang, true);
    saveStateToStorage();
    if (lang === 'en') {
      showToast('Bahasa invois ini ditukar kepada English!', 'info');
    } else {
      showToast('Bahasa invois ini ditukar kepada Bahasa Melayu!', 'info');
    }
  }

  /**
   * Render the active invoice into the paper view
   */
  function renderPaper() {
    const inv = getActiveInvoice();
    const lang = inv.language || 'ms';

    // Apply translations according to invoice's saved language
    applyLanguageToDocument(lang, false);

    // Header info
    els.docTitle.textContent = inv.title || (lang === 'en' ? 'INVOICE' : 'INVOIS');
    els.docInvoiceNumber.textContent = inv.invoiceNumber || '#INV-156355-ISGS';
    
    // Sender
    els.senderName.textContent = inv.sender?.name || '';
    els.senderAddress1.textContent = inv.sender?.addressLine1 || '';
    els.senderAddress2.textContent = inv.sender?.addressLine2 || '';
    els.senderPhone.textContent = inv.sender?.phone || '';
    els.senderEmail.textContent = inv.sender?.email || '';

    // Recipient
    els.recipientLabel.textContent = inv.recipient?.label || (lang === 'en' ? 'BILLED TO' : 'KEPADA');
    els.recipientName.textContent = inv.recipient?.name || '';
    els.recipientAddress1.textContent = inv.recipient?.addressLine1 || '';
    els.recipientAddress2.textContent = inv.recipient?.addressLine2 || '';
    els.recipientPhone.textContent = inv.recipient?.phone || '';
    if (els.recipientEmail) {
      els.recipientEmail.textContent = inv.recipient?.email || '';
    }

    // Dates
    els.invoiceDate.textContent = inv.dates?.invoiceDate || '';
    els.dueDate.textContent = inv.dates?.dueDate || '';

    // Items Table
    renderTableRows(inv.items || []);

    // Payment Box
    els.paymentTitle.textContent = inv.paymentDetails?.title || (lang === 'en' ? 'PAYMENT DETAILS' : 'BUTIRAN PEMBAYARAN');
    els.bankName.textContent = inv.paymentDetails?.bankName || '';
    els.accountNumber.textContent = inv.paymentDetails?.accountNumber || '';
    els.accountName.textContent = inv.paymentDetails?.accountName || '';
    els.idNumber.textContent = inv.paymentDetails?.idNumber || '';
    els.qrImage.src = inv.paymentDetails?.qrCodeUrl || DEFAULT_QR_PATH;

    // Paid Input
    els.inputPaid.value = formatMoney(inv.totals?.amountPaid ?? 0.00);

    // Footer
    els.footerText.textContent = inv.footer?.text || (lang === 'en' ? 'THANK YOU FOR YOUR BUSINESS' : 'TERIMA KASIH ATAS URUSAN ANDA');

    // Recalculate totals and display
    calculateAndDisplayTotals();
  }

  /**
   * Render Table Rows
   */
  function renderTableRows(items) {
    els.itemsTableBody.innerHTML = '';

    if (!items || items.length === 0) {
      const inv = getActiveInvoice();
      const lang = inv.language || 'ms';
      const descDefault = lang === 'en' ? 'Description of service or goods' : 'Penerangan perkhidmatan atau barangan';
      items = [
        {
          id: generateId('item'),
          description: descDefault,
          quantity: 1.00,
          unitPrice: 0.00,
          amount: 0.00
        }
      ];
      inv.items = items;
    }

    items.forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.dataset.itemId = item.id || `item_${index}`;

      const computedAmount = (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0);

      tr.innerHTML = `
        <td class="col-desc">
          <div class="editable-desc" contenteditable="true" spellcheck="false">${escapeHtml(item.description || '')}</div>
        </td>
        <td class="col-qty">
          <input type="number" step="any" min="0" class="inline-input item-qty" value="${parseFloat(item.quantity || 1).toFixed(2)}">
        </td>
        <td class="col-price">
          <input type="number" step="0.01" min="0" class="inline-input item-price" value="${formatMoney(item.unitPrice || 0)}">
        </td>
        <td class="col-amount item-total">
          ${formatMoney(computedAmount)}
        </td>
        <td class="col-action no-print">
          <button type="button" class="btn-remove-row" title="Padam baris ini" data-index="${index}">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </td>
      `;

      els.itemsTableBody.appendChild(tr);
    });

    bindRowEventListeners();
  }

  /**
   * Helper: Escape HTML
   */
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Bind event listeners to table inputs & buttons
   */
  function bindRowEventListeners() {
    // Delete buttons
    const deleteButtons = els.itemsTableBody.querySelectorAll('.btn-remove-row');
    deleteButtons.forEach(btn => {
      btn.onclick = function (e) {
        e.stopPropagation();
        const tr = btn.closest('tr');
        const rows = els.itemsTableBody.querySelectorAll('tr');
        if (rows.length <= 1) {
          showToast('Invois perlu mempunyai sekurang-kurangnya 1 baris item.', 'error');
          return;
        }
        tr.remove();
        syncTableToState();
        calculateAndDisplayTotals();
        saveStateToStorage();
      };
    });

    // Inputs inside rows (Qty & Unit Price)
    const qtyInputs = els.itemsTableBody.querySelectorAll('.item-qty');
    const priceInputs = els.itemsTableBody.querySelectorAll('.item-price');
    const descElements = els.itemsTableBody.querySelectorAll('.editable-desc');

    function onRowValueChange(e) {
      const tr = e.target.closest('tr');
      if (!tr) return;
      const qtyInput = tr.querySelector('.item-qty');
      const priceInput = tr.querySelector('.item-price');
      const totalCell = tr.querySelector('.item-total');

      const qty = parseFloat(qtyInput.value) || 0;
      const price = parseFloat(priceInput.value) || 0;
      const amount = qty * price;

      totalCell.textContent = formatMoney(amount);

      syncTableToState();
      calculateAndDisplayTotals();
      saveStateToStorage();
    }

    qtyInputs.forEach(input => {
      input.addEventListener('input', onRowValueChange);
      input.addEventListener('blur', () => {
        const val = parseFloat(input.value) || 0;
        input.value = val.toFixed(2);
      });
    });

    priceInputs.forEach(input => {
      input.addEventListener('input', onRowValueChange);
      input.addEventListener('blur', () => {
        const val = parseFloat(input.value) || 0;
        input.value = formatMoney(val);
      });
    });

    descElements.forEach(desc => {
      desc.addEventListener('input', () => {
        syncTableToState();
        saveStateToStorage();
      });
    });
  }

  /**
   * Sync table rows DOM back to active invoice object
   */
  function syncTableToState() {
    const inv = getActiveInvoice();
    const rows = els.itemsTableBody.querySelectorAll('tr');
    const newItems = [];

    rows.forEach(tr => {
      const desc = tr.querySelector('.editable-desc')?.textContent.trim() || '';
      const qty = parseFloat(tr.querySelector('.item-qty')?.value) || 0;
      const price = parseFloat(tr.querySelector('.item-price')?.value) || 0;
      const amount = qty * price;

      newItems.push({
        id: tr.dataset.itemId || generateId('item'),
        description: desc,
        quantity: qty,
        unitPrice: price,
        amount: amount
      });
    });

    inv.items = newItems;
    inv.updatedAt = new Date().toISOString();
  }

  /**
   * Calculate Subtotal, Total, and Balance Due and display on screen
   */
  function calculateAndDisplayTotals() {
    const inv = getActiveInvoice();
    let subtotal = 0;

    if (inv.items && inv.items.length > 0) {
      subtotal = inv.items.reduce((acc, it) => acc + (parseFloat(it.amount) || 0), 0);
    }

    const total = subtotal;
    const paid = parseFloat(els.inputPaid.value) || 0;
    const balanceDue = total - paid;

    inv.totals = {
      subtotal: subtotal,
      total: total,
      amountPaid: paid,
      balanceDue: balanceDue
    };

    els.valSubtotal.textContent = `RM ${formatMoney(subtotal)}`;
    els.valGrandTotal.textContent = `RM ${formatMoney(total)}`;
    els.valBalanceDue.textContent = `RM ${formatMoney(balanceDue)}`;
  }

  /**
   * Read all contenteditable fields into active invoice object
   */
  function syncAllPaperFieldsToState() {
    const inv = getActiveInvoice();

    inv.title = els.docTitle.textContent.trim();
    inv.invoiceNumber = els.docInvoiceNumber.textContent.trim();

    inv.sender = {
      name: els.senderName.textContent.trim(),
      addressLine1: els.senderAddress1.textContent.trim(),
      addressLine2: els.senderAddress2.textContent.trim(),
      phone: els.senderPhone.textContent.trim(),
      email: els.senderEmail.textContent.trim()
    };

    inv.recipient = {
      label: els.recipientLabel.textContent.trim(),
      name: els.recipientName.textContent.trim(),
      addressLine1: els.recipientAddress1.textContent.trim(),
      addressLine2: els.recipientAddress2.textContent.trim(),
      phone: els.recipientPhone.textContent.trim(),
      email: els.recipientEmail ? els.recipientEmail.textContent.trim() : ''
    };

    inv.dates = {
      invoiceDate: els.invoiceDate.textContent.trim(),
      dueDate: els.dueDate.textContent.trim()
    };

    inv.paymentDetails = {
      title: els.paymentTitle.textContent.trim(),
      bankName: els.bankName.textContent.trim(),
      accountNumber: els.accountNumber.textContent.trim(),
      accountName: els.accountName.textContent.trim(),
      idNumber: els.idNumber.textContent.trim(),
      qrCodeUrl: els.qrImage.getAttribute('src') || DEFAULT_QR_PATH
    };

    inv.footer = {
      text: els.footerText.textContent.trim()
    };

    syncTableToState();
    calculateAndDisplayTotals();
    inv.updatedAt = new Date().toISOString();
  }

  /**
   * Bind all inline contenteditable listeners
   */
  function bindInlineListeners() {
    const editableElements = document.querySelectorAll('#invoicePaper [contenteditable="true"]');
    editableElements.forEach(el => {
      el.addEventListener('input', () => {
        syncAllPaperFieldsToState();
        saveStateToStorage();
      });
    });

    // Language toggle clicks
    if (els.btnLangMs) {
      els.btnLangMs.addEventListener('click', () => {
        setInvoiceLanguage('ms');
      });
    }

    if (els.btnLangEn) {
      els.btnLangEn.addEventListener('click', () => {
        setInvoiceLanguage('en');
      });
    }

    // Paid input listener
    els.inputPaid.addEventListener('input', () => {
      calculateAndDisplayTotals();
      saveStateToStorage();
    });

    els.inputPaid.addEventListener('blur', () => {
      const val = parseFloat(els.inputPaid.value) || 0;
      els.inputPaid.value = formatMoney(val);
      calculateAndDisplayTotals();
      saveStateToStorage();
    });

    // Add Row Button
    els.btnAddRow.addEventListener('click', () => {
      syncAllPaperFieldsToState();
      const inv = getActiveInvoice();
      const lang = inv.language || 'ms';
      const descDefault = lang === 'en' ? 'New service description' : 'Penerangan perkhidmatan baru';

      if (!inv.items) inv.items = [];
      inv.items.push({
        id: generateId('item'),
        description: descDefault,
        quantity: 1.00,
        unitPrice: 0.00,
        amount: 0.00
      });
      renderTableRows(inv.items);
      calculateAndDisplayTotals();
      saveStateToStorage();

      // Focus newly added description
      const lastRow = els.itemsTableBody.querySelector('tr:last-child .editable-desc');
      if (lastRow) {
        lastRow.focus();
      }
    });

    // QR Image Upload triggers
    els.qrContainer.addEventListener('click', () => {
      els.qrFileInput.click();
    });

    els.qrFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showToast('Sila pilih fail imej yang sah (PNG, JPG, SVG, WebP).', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = function (event) {
        const base64Url = event.target.result;
        els.qrImage.src = base64Url;
        const inv = getActiveInvoice();
        if (!inv.paymentDetails) inv.paymentDetails = {};
        inv.paymentDetails.qrCodeUrl = base64Url;
        saveStateToStorage();
        showToast('Imej Kod QR berjaya dikemaskini!', 'success');
      };
      reader.readAsDataURL(file);
    });

    // Reset QR Button
    els.btnResetQr.addEventListener('click', (e) => {
      e.stopPropagation();
      els.qrImage.src = DEFAULT_QR_PATH;
      const inv = getActiveInvoice();
      if (!inv.paymentDetails) inv.paymentDetails = {};
      inv.paymentDetails.qrCodeUrl = DEFAULT_QR_PATH;
      saveStateToStorage();
      showToast('Kod QR ditetapkan semula kepada contoh asal.', 'info');
    });

    // Reset to Sample Data Link
    els.btnResetSample.addEventListener('click', () => {
      if (confirm('Adakah anda pasti ingin memuat semula data contoh asal? Perubahan semasa akan digantikan dengan contoh.')) {
        const sampleClone = JSON.parse(JSON.stringify(SAMPLE_INVOICE));
        sampleClone.id = generateId('inv');
        appState.invoices.unshift(sampleClone);
        appState.activeInvoiceId = sampleClone.id;
        saveStateToStorage();
        renderPaper();
        showToast('Data contoh asal telah dimuatkan!', 'success');
      }
    });

    // Save to List Quick Button
    els.btnSaveToStorage.addEventListener('click', () => {
      syncAllPaperFieldsToState();
      saveStateToStorage();
      showToast('Invois semasa berjaya disimpan dalam senarai tempatan!', 'success');
    });

    // Print / PDF Button
    els.btnPrintPdf.addEventListener('click', () => {
      syncAllPaperFieldsToState();
      saveStateToStorage();
      window.print();
    });

    // New Invoice Button
    els.btnNewInvoice.addEventListener('click', () => {
      createNewBlankInvoice();
    });
  }

  /**
   * Create a new blank invoice (Defaults to Bahasa Melayu)
   */
  function createNewBlankInvoice() {
    syncAllPaperFieldsToState();

    const today = new Date();
    const dateFormatted = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const randomInvNum = `#INV-${Math.floor(100000 + Math.random() * 900000)}`;

    const newInv = {
      id: generateId('inv'),
      language: 'ms', // Default Bahasa Melayu
      title: 'INVOIS',
      invoiceNumber: randomInvNum,
      sender: {
        name: els.senderName.textContent.trim() || 'Nama Syarikat / Anda',
        addressLine1: els.senderAddress1.textContent.trim() || 'Alamat Baris 1',
        addressLine2: els.senderAddress2.textContent.trim() || 'Bandar & Poskod',
        phone: els.senderPhone.textContent.trim() || 'Tel: 601111458944',
        email: els.senderEmail.textContent.trim() || 'E-mel: anda@domain.com'
      },
      recipient: {
        label: 'KEPADA',
        name: 'Nama Pelanggan Baru Sdn Bhd',
        addressLine1: 'Alamat Pelanggan',
        addressLine2: 'Bandar, Negeri & Poskod',
        phone: 'Tel: 01X-XXXXXXX',
        email: 'E-mel: info@pelanggan.com.my'
      },
      dates: {
        invoiceDate: dateFormatted,
        dueDate: dateFormatted
      },
      items: [
        {
          id: generateId('item'),
          description: 'Penerangan perkhidmatan / barangan baru',
          quantity: 1.00,
          unitPrice: 100.00,
          amount: 100.00
        }
      ],
      totals: {
        subtotal: 100.00,
        total: 100.00,
        amountPaid: 0.00,
        balanceDue: 100.00
      },
      paymentDetails: {
        title: 'BUTIRAN PEMBAYARAN',
        bankName: els.bankName.textContent.trim() || 'AEON Bank / Maybank',
        accountNumber: els.accountNumber.textContent.trim() || '1234567890',
        accountName: els.accountName.textContent.trim() || 'Nama Akaun Anda',
        idNumber: els.idNumber.textContent.trim() || 'No. K/P atau SSM',
        qrCodeUrl: els.qrImage.getAttribute('src') || DEFAULT_QR_PATH
      },
      footer: {
        text: 'TERIMA KASIH ATAS URUSAN ANDA'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    appState.invoices.unshift(newInv);
    appState.activeInvoiceId = newInv.id;
    saveStateToStorage();
    renderPaper();
    showToast(`Invois baru ${newInv.invoiceNumber} dicipta (Bahasa Melayu)!`, 'success');
  }

  // ==========================================================================
  // File Download & Upload Functions (Simpan & Muat data.json)
  // ==========================================================================

  /**
   * Download a JavaScript object as JSON file
   */
  function downloadJsonFile(dataObj, filename = 'data.json') {
    const jsonString = JSON.stringify(dataObj, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Save Current Invoice / All Invoices to data.json
   */
  function handleSaveJsonAction() {
    syncAllPaperFieldsToState();
    saveStateToStorage();

    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      activeInvoiceId: appState.activeInvoiceId,
      invoices: appState.invoices
    };

    const filename = `data.json`;
    downloadJsonFile(exportData, filename);
    showToast(`Fail ${filename} berjaya dimuat turun ke peranti anda!`, 'success');
  }

  /**
   * Handle loading JSON file from PC or phone
   */
  function handleLoadJsonFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        processImportedJson(parsed, file.name);
      } catch (err) {
        console.error('Error parsing JSON:', err);
        showToast('Gagal memproses fail JSON! Format fail tidak sah.', 'error');
      }
    };
    reader.readAsText(file);
  }

  /**
   * Parse and load invoices from JSON
   */
  function processImportedJson(parsed, filename = 'data.json') {
    let importedList = [];

    if (Array.isArray(parsed)) {
      importedList = parsed;
    } else if (parsed && Array.isArray(parsed.invoices)) {
      importedList = parsed.invoices;
    } else if (parsed && typeof parsed === 'object') {
      importedList = [parsed];
    } else {
      showToast('Struktur JSON tidak dikenali.', 'error');
      return;
    }

    if (importedList.length === 0) {
      showToast('Fail JSON tidak mengandungi rekod invois.', 'error');
      return;
    }

    let addedCount = 0;
    const existingIds = new Set(appState.invoices.map(i => i.id));

    importedList.forEach(item => {
      let safeId = item.id;
      if (!safeId || existingIds.has(safeId)) {
        safeId = generateId('inv');
      }
      existingIds.add(safeId);

      const lang = item.language || 'ms';
      const t = I18N[lang] || I18N.ms;

      const normalized = {
        id: safeId,
        language: lang,
        title: item.title || t.docTitle,
        invoiceNumber: item.invoiceNumber || `#INV-${Math.floor(100000 + Math.random() * 900000)}`,
        sender: item.sender || { ...SAMPLE_INVOICE.sender },
        recipient: item.recipient || { ...SAMPLE_INVOICE.recipient },
        dates: item.dates || { ...SAMPLE_INVOICE.dates },
        items: Array.isArray(item.items) ? item.items : [...SAMPLE_INVOICE.items],
        totals: item.totals || { ...SAMPLE_INVOICE.totals },
        paymentDetails: item.paymentDetails || { ...SAMPLE_INVOICE.paymentDetails },
        footer: item.footer || { text: t.footerText },
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString()
      };

      appState.invoices.unshift(normalized);
      addedCount++;
    });

    appState.activeInvoiceId = appState.invoices[0].id;
    saveStateToStorage();
    renderPaper();

    showToast(`Berjaya memuatkan ${addedCount} invois dari ${filename}!`, 'success');
    openDataManager();
  }

  // ==========================================================================
  // Data Manager Modal (Pengurus Data)
  // ==========================================================================

  function openDataManager() {
    renderInvoicesList();
    els.dataManagerModal.classList.add('active');
  }

  function closeDataManager() {
    els.dataManagerModal.classList.remove('active');
  }

  /**
   * Render the list of invoices inside Data Manager modal
   */
  function renderInvoicesList() {
    const query = (els.dataSearchInput.value || '').toLowerCase().trim();
    const container = els.invoicesList;
    container.innerHTML = '';

    const filtered = appState.invoices.filter(inv => {
      const invNum = (inv.invoiceNumber || '').toLowerCase();
      const client = (inv.recipient?.name || '').toLowerCase();
      const date = (inv.dates?.invoiceDate || '').toLowerCase();
      return invNum.includes(query) || client.includes(query) || date.includes(query);
    });

    els.dataManagerSummaryText.textContent = `Menunjukkan ${filtered.length} daripada ${appState.invoices.length} invois tersimpan`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-data-placeholder">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <div style="font-size: 0.95rem; font-weight: 600;">Tiada Invois Dijumpai</div>
          <div style="font-size: 0.8rem;">Muat naik fail data.json atau cipta invois baru untuk memulakan.</div>
        </div>
      `;
      return;
    }

    filtered.forEach(inv => {
      const isActive = inv.id === appState.activeInvoiceId;
      const card = document.createElement('div');
      card.className = `invoice-item-card ${isActive ? 'active-item' : ''}`;
      card.dataset.id = inv.id;

      const subtotal = inv.totals?.subtotal ?? 0;
      const clientName = inv.recipient?.name || 'Tiada Nama Klien';
      const invNum = inv.invoiceNumber || '#INV-KOSONG';
      const invDate = inv.dates?.invoiceDate || '-';
      const isEnglish = inv.language === 'en';

      card.innerHTML = `
        <div class="inv-card-info">
          <div class="inv-card-title-row">
            <span class="inv-badge-no">${escapeHtml(invNum)}</span>
            <span class="badge-lang">${isEnglish ? '🇬🇧 EN' : '🇲🇾 BM'}</span>
            <span class="inv-client-title">${escapeHtml(clientName)}</span>
            ${isActive ? '<span style="font-size: 0.65rem; background: #2563eb; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: 700;">SEDANG DIBUKA</span>' : ''}
          </div>
          <div class="inv-card-meta">
            <span>📅 ${isEnglish ? 'Date:' : 'Tarikh:'} ${escapeHtml(invDate)}</span>
            <span>📦 ${inv.items?.length || 0} ${isEnglish ? 'items' : 'item'}</span>
            <span>ID: <code style="font-size: 0.72rem; color: #94a3b8;">${escapeHtml(inv.id.substring(0, 12))}...</code></span>
          </div>
        </div>

        <div class="inv-card-amount">
          RM ${formatMoney(subtotal)}
        </div>

        <div class="inv-card-actions">
          <!-- Load Button (Boleh load nama yang sama kerana guna ID unik) -->
          <button type="button" class="btn btn-primary btn-load-inv" data-id="${inv.id}" title="Muat / buka invois ini di atas kertas">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            Muat
          </button>

          <!-- Duplicate Button (Boleh duplicate) -->
          <button type="button" class="btn btn-secondary btn-duplicate-inv" data-id="${inv.id}" title="Salin / Duplikasi invois ini">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            Salin
          </button>

          <!-- Export Single Invoice JSON -->
          <button type="button" class="btn btn-secondary btn-export-single" data-id="${inv.id}" title="Simpan invois ini sahaja sebagai JSON">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          </button>

          <!-- Delete Button -->
          <button type="button" class="btn btn-danger btn-delete-inv" data-id="${inv.id}" title="Padam invois ini dari senarai">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    bindModalListEvents();
  }

  /**
   * Bind event listeners inside Data Manager List
   */
  function bindModalListEvents() {
    // Load button
    els.invoicesList.querySelectorAll('.btn-load-inv').forEach(btn => {
      btn.onclick = function () {
        const id = btn.dataset.id;
        appState.activeInvoiceId = id;
        saveStateToStorage();
        renderPaper();
        renderInvoicesList();
        showToast('Invois telah dimuatkan ke paparan utama!', 'success');
        closeDataManager();
      };
    });

    // Duplicate button ("boleh duplicate, boleh load nama yang sama")
    els.invoicesList.querySelectorAll('.btn-duplicate-inv').forEach(btn => {
      btn.onclick = function () {
        const id = btn.dataset.id;
        const original = appState.invoices.find(i => i.id === id);
        if (!original) return;

        const clone = JSON.parse(JSON.stringify(original));
        clone.id = generateId('inv');

        const cleanInvNum = clone.invoiceNumber.replace(/\s*\(Salinan.*\)$/, '').replace(/\s*\(Copy.*\)$/, '');
        const suffix = clone.language === 'en' ? ' (Copy)' : ' (Salinan)';
        clone.invoiceNumber = `${cleanInvNum}${suffix}`;
        clone.createdAt = new Date().toISOString();
        clone.updatedAt = new Date().toISOString();

        const origIndex = appState.invoices.findIndex(i => i.id === id);
        appState.invoices.splice(origIndex + 1, 0, clone);

        saveStateToStorage();
        renderInvoicesList();
        showToast(`Invois berjaya diduplikasi (${clone.invoiceNumber})!`, 'success');
      };
    });

    // Export single invoice
    els.invoicesList.querySelectorAll('.btn-export-single').forEach(btn => {
      btn.onclick = function () {
        const id = btn.dataset.id;
        const target = appState.invoices.find(i => i.id === id);
        if (!target) return;

        const safeName = (target.invoiceNumber || 'invois').replace(/[^a-zA-Z0-9_-]/g, '_');
        downloadJsonFile(target, `${safeName}.json`);
        showToast(`Invois ${target.invoiceNumber} dieksport sebagai JSON!`, 'success');
      };
    });

    // Delete button
    els.invoicesList.querySelectorAll('.btn-delete-inv').forEach(btn => {
      btn.onclick = function () {
        const id = btn.dataset.id;
        if (appState.invoices.length <= 1) {
          showToast('Senarai mesti mengandungi sekurang-kurangnya satu invois.', 'error');
          return;
        }

        const target = appState.invoices.find(i => i.id === id);
        if (!confirm(`Padam invois ${target?.invoiceNumber || ''}? Tindakan ini tidak boleh dibatalkan.`)) {
          return;
        }

        appState.invoices = appState.invoices.filter(i => i.id !== id);

        if (appState.activeInvoiceId === id) {
          appState.activeInvoiceId = appState.invoices[0].id;
          renderPaper();
        }

        saveStateToStorage();
        renderInvoicesList();
        showToast('Invois telah dipadam dari senarai.', 'info');
      };
    });
  }

  /**
   * Bind Data Manager Toolbar Buttons
   */
  function bindDataManagerModalControls() {
    // Open modal
    els.btnOpenDataManager.addEventListener('click', openDataManager);

    // Close modal
    els.btnCloseDataManager.addEventListener('click', closeDataManager);
    els.btnCloseDataManagerBottom.addEventListener('click', closeDataManager);

    // Click backdrop to close
    els.dataManagerModal.addEventListener('click', (e) => {
      if (e.target === els.dataManagerModal) {
        closeDataManager();
      }
    });

    // Search filter input
    els.dataSearchInput.addEventListener('input', () => {
      renderInvoicesList();
    });

    // Trigger Upload from inside modal
    els.btnModalTriggerUpload.addEventListener('click', () => {
      els.jsonFileInput.click();
    });

    // Save Current To List button inside modal
    els.btnSaveCurrentToList.addEventListener('click', () => {
      syncAllPaperFieldsToState();
      saveStateToStorage();
      renderInvoicesList();
      showToast('Invois semasa dikemaskini dalam senarai!', 'success');
    });

    // Load Multi-Sample Demo Button (Guaranteed to succeed online & offline)
    const btnLoadDemoMulti = document.getElementById('btnLoadDemoMulti');
    if (btnLoadDemoMulti) {
      btnLoadDemoMulti.addEventListener('click', async () => {
        try {
          const data = await loadMultiSampleData();
          processImportedJson(data, 'multi-sample.json');
        } catch (err) {
          console.error(err);
          processImportedJson(JSON.parse(JSON.stringify(MULTI_SAMPLE_FALLBACK)), 'multi-sample.json');
        }
      });
    }

    // Download All JSON button inside modal
    els.btnDownloadAllJson.addEventListener('click', () => {
      handleSaveJsonAction();
    });

    // Header Trigger Load
    els.btnTriggerLoad.addEventListener('click', () => {
      els.jsonFileInput.click();
    });

    // Header File input change
    els.jsonFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleLoadJsonFile(file);
        e.target.value = '';
      }
    });

    // Header Save JSON button
    els.btnSaveJson.addEventListener('click', () => {
      handleSaveJsonAction();
    });
  }

  /**
   * Keyboard shortcuts
   */
  function bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        syncAllPaperFieldsToState();
        saveStateToStorage();
        window.print();
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSaveJsonAction();
      }

      if (e.key === 'Escape') {
        closeDataManager();
      }
    });
  }

  // ==========================================================================
  // Application Entry Point
  // ==========================================================================
  function init() {
    initStorage();
    renderPaper();
    bindInlineListeners();
    bindDataManagerModalControls();
    bindKeyboardShortcuts();
    updateBadgeCount();

    if (window.location.hash === '#datamanager') {
      openDataManager();
    } else if (window.location.hash === '#demo') {
      loadMultiSampleData()
        .then(data => {
          processImportedJson(data, 'multi-sample.json');
          openDataManager();
        })
        .catch(err => {
          console.error(err);
          processImportedJson(JSON.parse(JSON.stringify(MULTI_SAMPLE_FALLBACK)), 'multi-sample.json');
          openDataManager();
        });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
