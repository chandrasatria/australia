# Copyright (c) 2013, DAS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

def execute(filters=None):
	columns, data = [], []
	doctype = ""
	where = ""
	party = ""
	
	if filters.get("transaction_type") == "Sales":
		doctype = "Sales Invoice"
		party = "customer"
	elif filters.get("transaction_type") == "Purchase":
		doctype = "Purchase Invoice"
		party = "supplier"

	if filters.get("transaction_type") == "Sales" and filters.get("sales_gst_type"):
		where = """ AND sales_gst_type = "{0}" """.format(filters.get("sales_gst_type"))
	elif filters.get("transaction_type") == "Purchase" and filters.get("purchase_gst_type"):
		where = """ AND purchase_gst_type = "{0}" """.format(filters.get("purchase_gst_type"))
	
	columns = [
			_("Date")+":Date:120",
			_("Document No")+":Data:200",
			_("Party")+":Data:180",
			_("Total")+":Currency:150",
			_("Taxes and Charges")+":Currency:150",
			_("Grand Total")+":Currency:150"	
		]
	if doctype:
		data = frappe.db.sql("""
			SELECT 
			posting_date, name, {0}, total, total_taxes_and_charges, grand_total
			FROM `tab{1}` 
			WHERE docstatus = 1 {2}
			""".format(party,doctype,where))

	return columns, data
