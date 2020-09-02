// Copyright (c) 2016, DAS and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["GST Audit Report"] = {
	"onload":function(){
		frappe.query_report.filters[2].$wrapper.hide()
		frappe.query_report.filters[1].$wrapper.hide()

		frappe.query_report.filters[0].$input.on("click",function(){
			if (frappe.query_report.get_filter_value('transaction_type') == "Sales"){
				frappe.query_report.filters[1].$wrapper.show()
				frappe.query_report.filters[2].$wrapper.hide()
			} else if (frappe.query_report.get_filter_value('transaction_type') == "Purchase"){
				frappe.query_report.filters[2].$wrapper.show()
				frappe.query_report.filters[1].$wrapper.hide()
			}
		})
	},
	"filters": [
		{
			fieldname:"transaction_type",
			label: __("Transaction Type"),
			fieldtype: "Select",
			options: ["Sales", "Purchase"],
			reqd:1
		},
		{
			fieldname:"sales_gst_type",
			label: __("Sales GST Type"),
			fieldtype: "Select",
			options: ["GST on Income - Non Export", "GST on Income - Export", "GST Free Income", "GST Free Exports", "Input Taxed", "BAS Excluded"],	
			default: "GST on Income - Non Export"
		},
		{
			fieldname:"purchase_gst_type",
			label: __("Purchase GST Type"),
			fieldtype: "Select",
			options: ["GST on Capital", "GST on Expenses", "GST Free Capital", "Input Taxed", "GST Free Expenses", "BAS Excluded"],
			default: "GST on Capital"
		},
	]
};
