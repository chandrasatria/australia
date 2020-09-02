from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Tax Document"),
			"items": [
				{
					"type": "doctype",
					"name": "GST Calculation Worksheet",
					"description":_("GST Calculation Worksheet"),
					"onboard": 1,
				},
			]
		},
			{
			"label": _("Audit Report"),
			"items": [
				{
					"type": "report",
					"is_query_report": True,
					"name": "GST Audit Report",
					"doctype": "GST Calculation Worksheet",
					"onboard": 1,
				},
			]
		},
	]