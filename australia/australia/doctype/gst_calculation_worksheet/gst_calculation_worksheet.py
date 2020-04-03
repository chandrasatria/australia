# -*- coding: utf-8 -*-
# Copyright (c) 2020, DAS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class GSTCalculationWorksheet(Document):
	pass


@frappe.whitelist()
def get_sales(from_date,to_date):
	data = frappe.db.sql(""" SELECT 
		SUM(IF(sales_gst_type IS NOT NULL,grand_total,0)), 
		SUM(IF(sales_gst_type = "Export Sales", grand_total,0)),
		SUM(IF(sales_gst_type = "GST-free Sales", grand_total,0)),
		SUM(IF(sales_gst_type = "Input Taxed Sales", grand_total,0)),
		SUM(IF(sales_gst_type = "GST Sales", grand_total,0))
		
		FROM `tabSales Invoice` WHERE docstatus = 1 AND posting_date BETWEEN "{}" AND "{}" """.format(from_date,to_date))
	return data


@frappe.whitelist()
def get_purchase(from_date,to_date):
	data = frappe.db.sql(""" SELECT 
		SUM(IF(purchase_gst_type IS NOT NULL,grand_total,0)), 
		SUM(IF(purchase_gst_type = "Capital Purchase", grand_total,0)),
		SUM(IF(purchase_gst_type = "Non-capital Purchase", grand_total,0)),
		SUM(IF(purchase_gst_type = "Input Taxes Purchase", grand_total,0)),
		SUM(IF(purchase_gst_type = "Non-GST Purchase", grand_total,0)),
		SUM(IF(purchase_gst_type = "Private Use Purchase", grand_total,0))
		
		FROM `Purchase Invoice` WHERE docstatus = 1 AND posting_date BETWEEN "{}" AND "{}" """.format(from_date,to_date))
	return data