# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Australia",
			"category": "Modules",
			"color": "#32a88b",
			"icon": "octicon octicon-book",
			"type": "module",
			"label": _("Australia"),
			"description": "Quality goals, procedures, reviews and action."

			# "module_name": "Accounts",
			# "category": "Modules",
			# "label": _("Accounting"),
			# "color": "#3498db",
			# "icon": "octicon octicon-repo",
			# "type": "module",
			# "description": "Accounts, billing, payments, cost center and budgeting."
		}
	]
