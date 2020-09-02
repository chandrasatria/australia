// Copyright (c) 2020, DAS and contributors
// For license information, please see license.txt

frappe.ui.form.on('GST Calculation Worksheet', {
	refresh: function(frm) {

	}
});

function calculate_sales(doc){
	doc.g5 = doc.g2 + doc.g3 + doc.g4
	doc.g6 = doc.g1 - doc.g5
	doc.g8 = doc.g6 + doc.g7
	doc.g9 = Math.round(doc.g8 / 11)
	
	refresh_field("g1")
	refresh_field("g2")
	refresh_field("g3")
	refresh_field("g4")
	refresh_field("g5")
	refresh_field("g6")
	refresh_field("g8")
	refresh_field("g9")
}

function calculate_purchase(doc){
	doc.g12 = doc.g10 + doc.g11
	doc.g16 = doc.g13 + doc.g14 + doc.g15
	doc.g17 = doc.g12 - doc.g16
	doc.g19 = doc.g18 + doc.g17
	doc.g20 = Math.round(doc.g19 / 11)
	
	refresh_field("g10")
	refresh_field("g11")
	refresh_field("g12")
	refresh_field("g13")
	refresh_field("g14")
	refresh_field("g15")
	refresh_field("g16")
	refresh_field("g17")
	refresh_field("g18")
	refresh_field("g19")
	refresh_field("g20")
}


cur_frm.cscript.get_sales_and_purchase = function(doc){
	if(doc.tax_period && doc.to_tax_period){
		frappe.call({
		    method: "australia.australia.doctype.gst_calculation_worksheet.gst_calculation_worksheet.get_sales",
		    args: {
		      "from_date" : doc.tax_period,
		      "to_date" : doc.to_tax_period
			},
		    callback: function(r) {
			if (r["message"]){
					doc.g1 = r["message"][0][0]
					doc.g2 = r["message"][0][1]
					doc.g3 = r["message"][0][2]
					doc.g4 = r["message"][0][3]

					calculate_sales(doc)
				}
		    }
		});

		frappe.call({
		    method: "australia.australia.doctype.gst_calculation_worksheet.gst_calculation_worksheet.get_purchase",
		    args: {
		      "from_date" : doc.tax_period,
		      "to_date" : doc.to_tax_period
			},
		    callback: function(r) {
			if (r["message"]){
					doc.g10 = r["message"][0][1]
					doc.g11 = r["message"][0][2]
					doc.g13 = r["message"][0][3]
					doc.g14 = r["message"][0][4]
					calculate_purchase(doc)
				}
		    }
		});
	}
	else{
		frappe.throw("Please input from and to date first before get Sales and Purchase")
	}
}


cur_frm.cscript.custom_g1 = function(doc){
	calculate_sales(doc)
}
cur_frm.cscript.custom_g2 = function(doc){
	calculate_sales(doc)
}
cur_frm.cscript.custom_g3 = function(doc){
	calculate_sales(doc)
}
cur_frm.cscript.custom_g4 = function(doc){
	calculate_sales(doc)
}
cur_frm.cscript.custom_g5 = function(doc){
	calculate_sales(doc)
}
cur_frm.cscript.custom_g6 = function(doc){
	calculate_sales(doc)
}
cur_frm.cscript.custom_g7 = function(doc){
	calculate_sales(doc)
}
cur_frm.cscript.custom_g8 = function(doc){
	calculate_sales(doc)
}
cur_frm.cscript.custom_g9 = function(doc){
	calculate_sales(doc)
}

cur_frm.cscript.custom_g10 = function(doc){
	calculate_purchase(doc)
}
cur_frm.cscript.custom_g11 = function(doc){
	calculate_purchase(doc)
}
cur_frm.cscript.custom_g12 = function(doc){
	calculate_purchase(doc)
}
cur_frm.cscript.custom_g13 = function(doc){
	calculate_purchase(doc)
}
cur_frm.cscript.custom_g14 = function(doc){
	calculate_purchase(doc)
}
cur_frm.cscript.custom_g15 = function(doc){
	calculate_purchase(doc)
}
cur_frm.cscript.custom_g16 = function(doc){
	calculate_purchase(doc)
}
cur_frm.cscript.custom_g17 = function(doc){
	calculate_purchase(doc)
}
cur_frm.cscript.custom_g18 = function(doc){
	calculate_purchase(doc)
}
cur_frm.cscript.custom_g19 = function(doc){
	calculate_purchase(doc)
}
cur_frm.cscript.custom_g20 = function(doc){
	calculate_purchase(doc)
}


