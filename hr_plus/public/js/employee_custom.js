frappe.ui.form.on('Employee', {
    // ---------------- SSS LOGIC ----------------
    custom_sss: function(frm) {
        let val = frm.doc.custom_sss;
        if (!val) return;

        let cleaned = ('' + val).replace(/\D/g, '');
        let formatted = '';

        // SSS Case A: 10 Digits (Standard) -> 00-0000000-0
        if (cleaned.length === 10) {
            formatted = cleaned.replace(/^(\d{2})(\d{7})(\d{1})$/, "$1-$2-$3");
        } 
        // SSS Case B: 12 Digits (Extended) -> 00-0000000-0-00
        else if (cleaned.length === 12) {
            formatted = cleaned.replace(/^(\d{2})(\d{7})(\d{1})(\d{2})$/, "$1-$2-$3-$4");
        }

        if (formatted && val !== formatted) {
            frm.set_value('custom_sss', formatted);
        }
    },

    // ---------------- PHILHEALTH LOGIC ----------------
    custom_philhealth: function(frm) {
        let val = frm.doc.custom_philhealth;
        if (!val) return;

        let cleaned = ('' + val).replace(/\D/g, '');
        
        // PhilHealth: 12 Digits -> 00-000000000-0
        if (cleaned.length === 12) {
            let formatted = cleaned.replace(/^(\d{2})(\d{9})(\d{1})$/, "$1-$2-$3");
            
            if (val !== formatted) {
                frm.set_value('custom_philhealth', formatted);
            }
        }
    },

    // ---------------- PAG-IBIG LOGIC ----------------
    custom_pagibig: function(frm) {
        let val = frm.doc.custom_pagibig;
        if (!val) return;

        let cleaned = ('' + val).replace(/\D/g, '');

        // Pag-IBIG: 12 Digits -> 0000-0000-0000
        if (cleaned.length === 12) {
            let formatted = cleaned.replace(/^(\d{4})(\d{4})(\d{4})$/, "$1-$2-$3");
            
            if (val !== formatted) {
                frm.set_value('custom_pagibig', formatted);
            }
        }
    },

    // ---------------- VALIDATION (ON SAVE) ----------------
    validate: function(frm) {
        // 1. Validate SSS
        if (frm.doc.custom_sss) {
            let sss_clean = ('' + frm.doc.custom_sss).replace(/\D/g, '');
            if (sss_clean.length !== 10 && sss_clean.length !== 12) {
                frappe.throw(__("Invalid SSS. It must be 10 or 12 digits."));
            }
        }

        // 2. Validate PhilHealth
        if (frm.doc.custom_philhealth) {
            let ph_clean = ('' + frm.doc.custom_philhealth).replace(/\D/g, '');
            if (ph_clean.length !== 12) {
                frappe.throw(__("Invalid PhilHealth. It must be exactly 12 digits."));
            }
        }

        // 3. Validate Pag-IBIG
        if (frm.doc.custom_pagibig) {
            let pi_clean = ('' + frm.doc.custom_pagibig).replace(/\D/g, '');
            if (pi_clean.length !== 12) {
                frappe.throw(__("Invalid Pag-IBIG. It must be exactly 12 digits."));
            }
        }
    }
});