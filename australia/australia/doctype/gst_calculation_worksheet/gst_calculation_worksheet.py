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
		SUM(IF(sales_gst_type = "GST on Income - Non Export", grand_total,0)),
		SUM(IF(sales_gst_type = "GST on Income - Export", grand_total,0)),
		SUM(IF(sales_gst_type = "GST Free Income" or sales_gst_type = "GST Free Exports", grand_total,0)),
		SUM(IF(sales_gst_type = "Input Taxed", grand_total,0))
		
		FROM `tabSales Invoice` WHERE docstatus = 1 AND posting_date BETWEEN "{}" AND "{}" """.format(from_date,to_date))
	return data


@frappe.whitelist()
def get_purchase(from_date,to_date):
	data = frappe.db.sql(""" SELECT 
		SUM(IF(purchase_gst_type IS NOT NULL,grand_total,0)), 
		SUM(IF(purchase_gst_type = "GST on Capital", grand_total,0)),
		SUM(IF(purchase_gst_type = "GST on Expenses" or purchase_gst_type = "GST Free Capital", grand_total,0)),
		SUM(IF(purchase_gst_type = "Input Taxed", grand_total,0)),
		SUM(IF(purchase_gst_type = "GST Free Expenses", grand_total,0))
		
		FROM `Purchase Invoice` WHERE docstatus = 1 AND posting_date BETWEEN "{}" AND "{}" """.format(from_date,to_date))
	return data
