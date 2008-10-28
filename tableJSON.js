
/**
 *
 * HTML Table JSON serialization library.
 *
 * @author <a href="mailto:ricardofragacamelo@gmail.com">Ricardo Fraga Camelo</a>
 * @version 0.1
 *
 */

function TableJSON(_table, _tableModel, _tableDescription, debug) {

	var logger = new Logger(debug);
	
	var tableRowClass = null;
	var tableRowStyle = null;
	var tableRowOnClick = null;
	var tableRowOnMouseOver = null;
	var tableRowOnMouseOut = null;
	
	var tableCollumnWidth = null;
	var tableCollumnClass = null;
	var tableCollumnStyle = null;
	var tableCollumnOnClick = null;
	var tableCollumnOnMouseOver = null;
	var tableCollumnOnMouseOut = null;
	
	var table = _table;
	var tableModel = _tableModel;
	var tableDescription = _tableDescription;
	
	this.build = function(userDefinedTableDescription) {
		var resolvedTableDescription = null;
	
		if (this.getTable().nodeName != "TABLE") {
			throw new TableJSONException("defined table object is not an HTML table");
		}
		
		if (!this.getTableModel()) {
			throw new TableJSONException("no table model defined");
		}
		
		if (this.getTableDescription()) {
			resolvedTableDescription = this.getTableDescription();
		} else if (userDefinedTableDescription) {
			resolvedTableDescription = userDefinedTableDescription;
		} else {
			resolvedTableDescription = resolveTableDescription(this, this.getTable());
			
			if (!resolvedTableDescription) {
				throw new TableJSONException("no table description found");
			}
		}
		
		buildTable(this, table, this.getTableModel(), resolvedTableDescription);
	}
	
	this.setTable = function(_table) {
		table = _table;	
	}		
	
	this.getTable = function() {
		return table;
	}
	
	this.setTableModel = function(_tableModel) {
		tableModel = _tableModel;	
	}		
	
	this.getTableModel = function() {
		return tableModel;
	}
	
	this.getTableDescription = function(_tableDescription) {
		return tableDescription;
	}
	
	this.setTableDescription = function(_tableDescription) {
		tableDescription = _tableDescription;
	}
	
	this.setTableRowClass = function(_tableRowClass) {
		tableRowClass = _tableRowClass;
	}
	
	this.setTableRowStyle = function(_tableRowStyle) {
		tableRowStyle = _tableRowStyle;
	}
	
	this.setTableRowOnClick = function(_tableRowOnClick) {
		tableRowOnClick = function(event) {
			if (this.rowIndex) {
				var arrayIndex = this.rowIndex - 1;
				var selectedObject = tableModel[arrayIndex];
						
				_tableRowOnClick.call(null, selectedObject, event);
			}
		}
	}
	
	this.setTableRowOnMouseOver = function(_tableRowOnMouseOver) {
		tableRowOnMouseOver = _tableRowOnMouseOver;
	}
	
	this.setTableRowOnMouseOut = function(_tableRowOnMouseOut) {
		tableRowOnMouseOut = _tableRowOnMouseOut;
	}

	
	this.setTableCollumnWidth = function(_tableCollumnWidth) {
		tableCollumnWidth = _tableCollumnWidth;
	}
	
	this.setTableCollumnClass = function(_tableCollumnClass) {
		tableCollumnClass = _tableCollumnClass;
	}
	
	this.setTableCollumnStyle = function(_tableCollumnStyle) {
		tableCollumnStyle = _tableCollumnStyle;
	}
	
	this.setTableCollumnOnClick = function(_tableCollumnOnClick) {
		tableCollumnOnClick = _tableCollumnOnClick;
	}
	
	this.setTableCollumnOnMouseOver = function(_tableCollumnOnMouseOver) {
		tableCollumnOnMouseOver = _tableCollumnOnMouseOver;
	}
	
	this.setTableCollumnOnMouseOut = function(_tableCollumnOnMouseOut) {
		tableCollumnOnMouseOut = _tableCollumnOnMouseOut;
	}
	
	this.getLogger = function() {
		return logger;
	}
	
	this.getLoggerOutput = function() {
		return logger.getOutput();
	}
	
	
	function buildTable(tableJSON, table, jsObjectArray, tableDescription) {
		var tableTBody = TableJSONUtil.findTableTbody(table);
		
		if (!tableTBody) {
			throw new TableJSONException("a table body (<tbody>) is needed for table building");
		}
		
		for (var jsObjectArrayItem in jsObjectArray) {
			var rowObject = jsObjectArray[jsObjectArrayItem];
			
			buildTableRow(tableJSON, tableTBody, rowObject, tableDescription);
		}
		
	}
	
	function buildTableRow(tableJSON, tableTBody, rowObject, tableDescription) {
		var tableRow = tableTBody.ownerDocument.createElement("tr");
		
		if (tableJSON.getLogger().isDebugEnabled()) {
			tableJSON.getLogger().log("added table row");
		}
		
		if (tableRowClass) {
			tableRow.className = tableRowClass;
		}
		
		if (tableRowStyle) {
			tableRow.style = tableRowStyle;
		}
		
		if (tableRowOnClick) {
			tableRow.onclick = tableRowOnClick;
		}
		
		if (tableRowOnMouseOver) {
			tableRow.onmouseover = tableRowOnMouseOver;
		}
		
		if (tableRowOnMouseOut) {
			tableRow.onmouseout = tableRowOnMouseOut;
		}
		
		tableTBody.appendChild(tableRow);
		
		
	
		for (var objectPropertyName in tableDescription) {
			var collumnValue = rowObject[objectPropertyName];
			var collumnDescription = tableDescription[objectPropertyName];
			
			buildTableCollumn(tableJSON, tableRow, collumnValue, collumnDescription);
		}		
	}
	
	function buildTableCollumn(tableJSON, tableRow, collumnValue, collumnDescription) {
		var tableCollumn = tableRow.ownerDocument.createElement("td");
		var tableCollumText = null;

		if (collumnDescription) {
		
		} else {
			if (tableCollumnWidth) {
				tableCollumn.width = tableCollumnWidth;
			}
			
			if (tableCollumnClass) {
				tableCollumn.className = tableCollumnClass;
			}
			
			if (tableCollumnStyle) {
				tableCollumn.style = tableCollumnStyle;
			}
			
			if (tableCollumnOnClick) {
				tableCollumn.onclick = tableCollumnOnClick;
			}
			
			if (tableCollumnOnMouseOver) {
				tableCollumn.onmouseover = tableCollumnOnMouseOver;
			}
			
			if (tableCollumnOnMouseOut) {
				tableCollumn.onmouseout = tableCollumnOnMouseOut;
			}
		}
		
		tableRow.appendChild(tableCollumn);
		
		if (collumnValue) {
			tableCollumText = tableRow.ownerDocument.createTextNode(collumnValue);
			tableCollumn.appendChild(tableCollumText);
			
			if (tableJSON.getLogger().isDebugEnabled()) {
				tableJSON.getLogger().log("added table collumn [" + collumnValue + "]");
			}
		}
	}
		
	function resolveTableDescription(tableJSON, table) {
		var tableDescription = null;
		var tableThead = TableJSONUtil.findTableThead(table);
		
		if (tableThead) {
			tableDescription = new Array();
			
			traverseResolveTableDescription(tableJSON, tableThead, tableDescription);
		}
		
		return tableDescription;
	}
	
	function traverseResolveTableDescription(tableJSON, tableThead, tableDescription) {
		var tableTheadChildren = tableThead.childNodes;
		
		for (var tableTheadChildItem in tableTheadChildren) {
			var tableTheadChild = tableTheadChildren[tableTheadChildItem];
			
			visitNodeResolveTableDescription(tableJSON, tableTheadChild, tableDescription);			
			
			traverseResolveTableDescription(tableJSON, tableTheadChild, tableDescription);
		}
		
	}
	
	function visitNodeResolveTableDescription(tableJSON, tableTheadChild, tableDescription) {
		if (tableTheadChild.nodeName == "TH") {
			if (tableJSON.getLogger().isDebugEnabled()) {
				tableJSON.getLogger().log("table description - TH found [" + TableJSONUtil.resolveNodeName(tableTheadChild) + "]");
			}
		
			var name = TableJSONUtil.resolveNodeName(tableTheadChild);
			tableDescription[name] = null;
		}
	}


	/* Logger inner class */
	
	function Logger(_debug) {
	
		var loggerOutput = "";
		var debug = _debug;
		
		this.log = function(message) {
			if (debug) {
				loggerOutput += "[" + (new Date()).toUTCString() + "]" + message + "\r\n";
			}
		}
		
		this.isDebugEnabled = function() {
			return debug; 		
		}
		
		this.clearLog = function() {
			loggerOutput = ""; 		
		}
		
		this.getOutput = function() {
			return new String(loggerOutput);			
		}
	
	}
	
}

/* Helper class with utility functions */

var TableJSONUtil = new function() {
		
	this.findTableThead = function(node) {
		var childNodes = null;
		
		if (node) {
			childNodes = node.childNodes;
			
			for (var childNode in childNodes) {
				var candidateThead = childNodes[childNode];
			
				if (candidateThead.nodeName == "THEAD") {
					return candidateThead;
				}
						
				this.findTableThead(candidateThead);
			}
		}
		
		return null;
	}
	
	this.findTableTbody = function(node) {
		var childNodes = null;
		
		if (node) {
			childNodes = node.childNodes;
			
			for (var childNode in childNodes) {
				var candidateTbody = childNodes[childNode];
			
				if (candidateTbody.nodeName == "TBODY") {
					return candidateTbody;
				}
						
				this.findTableThead(candidateTbody);
			}
		}
		
		return null;
	}

	this.isValueInArrayOrEqual = function(value1, value2) {
		if (value1) {
			if (value2) {
				if (value2 instanceof Array) {
					for (var item in value2) {
						if (value2[item] == value1) {
							return true;
						}				
					}
				} else if (value1 == value2) {
					return true;				
				}
			}
		}
		
		return false;	
	}
				
	this.isNullValue = function(value) {
		if (value) {
			if (value == "") {
				return true;		
			} else {
				return false;
			}
		}
		
		return true;
	}
	
	this.resolveNodeName = function(node) {
		var nodeName = null;
		
		if (node.id) {
			nodeName = node.id;
		} else if (node.name) {
			nodeName = node.name;
		}
		
		return nodeName;
	}

}

/* exception throw in error situations */

function TableJSONException(msg) {

	this.message = msg;
	
	this.toString = function () {
		return this.message;
	}
	
}
