
/**
 *
 * HTML Form JSON serialization library.
 *
 * @author <a href="mailto:ricardofragacamelo@gmail.com">Ricardo Fraga Camelo</a>
 * @version 0.5
 *
 */


function FormJSON(debug) {

	/* private properties */
	
	var logger = new Logger(debug);
			
	var serializeInputTypeText = defaultSerializeInputTypeText;
	var serializeInputTypeHidden = defaultSerializeInputTypeHidden;
	var serializeInputTypePassword = defaultSerializeInputTypePassword;
	var serializeInputTypeRadio = defaultSerializeInputTypeRadio;
	var serializeInputTypeCheckBox = defaultSerializeInputTypeCheckBox;
	var serializeTextArea = defaultSerializeTextArea;
	var serializeInputTypeSelect = defaultSerializeInputTypeSelect;
	var serializeOption = defaultSerializeOption;
	
	var deserializeInputTypeText = defaultDeserializeInputTypeText;
	var deserializeInputTypeHidden = defaultDeserializeInputTypeHidden;
	var deserializeInputTypePassword = defaultDeserializeInputTypePassword;
	var deserializeInputTypeRadio = defaultDeserializeInputTypeRadio;
	var deserializeInputTypeCheckBox = defaultDeserializeInputTypeCheckBox;
	var deserializeTextArea = defaultDeserializeTextArea;
	var deserializeInputTypeSelect = defaultDeserializeInputTypeSelect;
	var deserializeOption = defaultDeserializeOption;
	

	/* public interface */

	this.serializeToString = function(form) {
		var jsonBuilder = new JSONBuilder();
		
		if (form.nodeName != "FORM") {
			throw new FormJSONException("argument not a HTML form object");
		}
		
		serializeTraverseNodes(this, form, jsonBuilder);
		
		return jsonBuilder.toJSONString();
	}
	
	this.serialize = function(form) {
		var jsonBuilder = new JSONBuilder();
		
		if (form.nodeName != "FORM") {
			throw new FormJSONException("argument not a HTML form object");
		}
		
		serializeTraverseNodes(this, form, jsonBuilder);
		
		return jsonBuilder.toJSON();		
	}
	
	this.deserialize = function(form, jsonObject) {

		if (form.nodeName != "FORM") {
			throw new FormJSONException("argument not a HTML form object");
		}
		
		deserializeTraverseNodes(this, form, jsonObject);
	}
	
	
	this.setSerializeInputTypeText = function(_serializeInputTypeText) {
		serializeInputTypeText = _serializeInputTypeText;
	}
	
	this.setSerializeInputTypeHidden = function(_serializeInputTypeHidden) {
		serializeInputTypeHidden = _serializeInputTypeHidden;
	}
	
	this.setSerializeInputTypePassword = function(_serializeInputTypePassword) {
		serializeInputTypePassword = _serializeInputTypePassword;
	}
	
	this.setSerializeInputTypeRadio = function(_serializeInputTypeRadio) {
		serializeInputTypeRadio = _serializeInputTypeRadio;
	}
	
	this.setSerializeInputTypeCheckBox = function(_serializeInputTypeCheckBox) {
		serializeInputTypeCheckBox = _serializeInputTypeCheckBox;
	}
	
	this.setSerializeTextArea = function(_serializeTextArea) {
		serializeTextArea = _serializeTextArea;
	}
	
	this.setSerializeInputTypeSelect = function(_serializeInputTypeSelect) {
		serializeInputTypeText = _serializeInputTypeText;
	}
	
	this.setSerializeOption = function(_serializeInputTypeText) {
		serializeInputTypeSelect = _serializeInputTypeSelect;
	}

	
	this.setDeserializeInputTypeText = function(_deserializeInputTypeText) {
		deserializeInputTypeText = _deserializeInputTypeText;
	}
	
	this.setDeserializeInputTypeHidden = function(_deserializeInputTypeHidden) {
		deserializeInputTypeHidden = _deserializeInputTypeHidden;
	}
	
	this.setDeserializeInputTypePassword = function(_deserializeInputTypePassword) {
		deserializeInputTypePassword = _deserializeInputTypePassword;
	}
	
	this.setDeserializeInputTypeRadio = function(_deserializeInputTypeRadio) {
		deserializeInputTypeRadio = _deserializeInputTypeRadio;
	}
	
	this.setDeserializeInputTypeCheckBox = function(_deserializeInputTypeCheckBox) {
		deserializeInputTypeCheckBox = _deserializeInputTypeCheckBox;
	}
	
	this.setDeserializeTextArea = function(_deserializeTextArea) {
		deserializeTextArea = _deserializeTextArea;
	}
	
	this.setDeserializeInputTypeSelect = function(_deserializeInputTypeSelect) {
		deserializeInputTypeText = _deserializeInputTypeText;
	}
	
	this.setDeserializeOption = function(_deserializeInputTypeText) {
		deserializeInputTypeSelect = _deserializeInputTypeSelect;
	}


	this.getLogger = function() {
		return logger;
	}
	
	this.getLoggerOutput = function() {
		return logger.getOutput();
	}
	
	
	/* serialize traverse functions */
	
	function serializeTraverseNodes(formJSON, root, jsonBuilder) {
		var childNodes = root.childNodes;
		
		for (var childNode in childNodes) {
			var node = childNodes[childNode];
			
			serializeVisitNode(formJSON, node, jsonBuilder);
						
			serializeTraverseNodes(formJSON, node, jsonBuilder);
		}
	}
	
	function serializeVisitNode(formJSON, node, jsonBuilder) {
		if (node.nodeName == "INPUT") {
			if (node.type == "text") {
				serializeInputTypeText(formJSON, node, jsonBuilder);
			} else if (node.type == "checkbox") {
				serializeInputTypeCheckBox(formJSON, node, jsonBuilder);
			} else if (node.type == "radio") {
				serializeInputTypeRadio(formJSON, node, jsonBuilder);
			} else if (node.type == "hidden") {
				serializeInputTypeHidden(formJSON, node, jsonBuilder);
			} else if (node.type == "password") {
				serializeInputTypePassword(formJSON, node, jsonBuilder);
			}
		} else if (node.nodeName == "TEXTAREA") {
			serializeTextArea(formJSON, node, jsonBuilder);
		} else if (node.nodeName == "SELECT") {
			serializeInputTypeSelect(formJSON, node, jsonBuilder);
		} else if (node.nodeName == "OPTION") {
			serializeOption(formJSON, node, jsonBuilder);
		}
	}
	
	
	/* deserialize traverse functions */
	
	function deserializeTraverseNodes(formJSON, root, jsonBuilder) {
		var childNodes = root.childNodes;
		
		for (var childNode in childNodes) {
			var node = childNodes[childNode];
			
			deserializeVisitNode(formJSON, node, jsonBuilder);
						
			deserializeTraverseNodes(formJSON, node, jsonBuilder);
		}
	}
	
	function deserializeVisitNode(formJSON, node, jsonBuilder) {
		if (node.nodeName == "INPUT") {
			if (node.type == "text") {
				deserializeInputTypeText(formJSON, node, jsonBuilder);
			} else if (node.type == "checkbox") {
				deserializeInputTypeCheckBox(formJSON, node, jsonBuilder);
			} else if (node.type == "radio") {
				deserializeInputTypeRadio(formJSON, node, jsonBuilder);
			} else if (node.type == "hidden") {
				deserializeInputTypeHidden(formJSON, node, jsonBuilder);
			} else if (node.type == "password") {
				deserializeInputTypePassword(formJSON, node, jsonBuilder);
			}
		} else if (node.nodeName == "TEXTAREA") {
			deserializeTextArea(formJSON, node, jsonBuilder);
		} else if (node.nodeName == "SELECT") {
			deserializeInputTypeSelect(formJSON, node, jsonBuilder);
		} else if (node.nodeName == "OPTION") {
			deserializeOption(formJSON, node, jsonBuilder);
		}
	}
	
	
	/* default serialize functions */
	
	function defaultSerializeInputTypeText(formJSON, node, jsonBuilder) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("serialize input type text [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (node.value) {
			jsonBuilder.addProperty(FormJSONUtil.resolveNodeName(node), node.value);
		}
	}
	
	function defaultSerializeInputTypeHidden(formJSON, node, jsonBuilder) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("serialize input type hidden [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (node.value) {
			jsonBuilder.addProperty(FormJSONUtil.resolveNodeName(node), node.value);
		}
	}
	
	function defaultSerializeInputTypePassword(formJSON, node, jsonBuilder) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("serialize input type password [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (node.value) {
			jsonBuilder.addProperty(FormJSONUtil.resolveNodeName(node), node.value);
		}
	}
	
	function defaultSerializeInputTypeRadio(formJSON, node, jsonBuilder) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("serialize input radio [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (node.value) {
			if (node.checked == true) {
				jsonBuilder.addProperty(FormJSONUtil.resolveNodeName(node), node.value);
			}
		}
	}
	
	function defaultSerializeInputTypeCheckBox(formJSON, node, jsonBuilder) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("serialize input check box [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (node.value) {
			if (node.checked == true) {
				jsonBuilder.addProperty(FormJSONUtil.resolveNodeName(node), node.value);
			}
		}
	}
	
	function defaultSerializeTextArea(formJSON, node, jsonBuilder) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("serialize text area [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (node.value) {
			jsonBuilder.addProperty(FormJSONUtil.resolveNodeName(node), node.value);
		}
	}
	
	function defaultSerializeInputTypeSelect(formJSON, node, jsonBuilder) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("serialize select [" + FormJSONUtil.resolveNodeName(node)+ "]");
		}
	}
		
	function defaultSerializeOption(formJSON, node, jsonBuilder) {
		var selectOptionParent = null;
		
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("serialize option [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (node.value) {
			if (node.selected == true) { 
				selectOptionParent = FormJSONUtil.findSelectOptionParent(node);
				if (selectOptionParent != null) {
					jsonBuilder.addProperty(FormJSONUtil.resolveNodeName(selectOptionParent), node.value);
				}
			}
		}
	}
	
	
	/* default deserialize functions */
	
	function defaultDeserializeInputTypeText(formJSON, node, jsonObject) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("deserialize input type text [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (jsonObject[FormJSONUtil.resolveNodeName(node)]) {
			node.value = jsonObject[FormJSONUtil.resolveNodeName(node)];
		} else {
			node.value = "";
		}
	}
	
	function defaultDeserializeInputTypeHidden(formJSON, node, jsonObject) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("deserialize input type hidden [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (jsonObject[FormJSONUtil.resolveNodeName(node)]) {
			node.value = jsonObject[FormJSONUtil.resolveNodeName(node)];
		} else {
			node.value = "";
		}
	}
	
	function defaultDeserializeInputTypePassword(formJSON, node, jsonObject) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("deserialize input type password [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (jsonObject[FormJSONUtil.resolveNodeName(node)]) {
			node.value = jsonObject[FormJSONUtil.resolveNodeName(node)];
		} else {
			node.value = "";
		}
	}
	
	function defaultDeserializeInputTypeRadio(formJSON, node, jsonObject) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("deserialize input radio [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (node.value) {
			if (jsonObject[FormJSONUtil.resolveNodeName(node)]) {
				if (FormJSONUtil.isValueInArrayOrEqual(node.value, jsonObject[FormJSONUtil.resolveNodeName(node)])) {
					node.checked = true;
				} else {
					//node.checked = false;
				}
			} else {
				//node.checked = false;		
			}
		}
	}
	
	function defaultDeserializeInputTypeCheckBox(formJSON, node, jsonObject) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("deserialize input check box [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (node.value) {
			if (jsonObject[FormJSONUtil.resolveNodeName(node)]) {
				if (FormJSONUtil.isValueInArrayOrEqual(node.value, jsonObject[FormJSONUtil.resolveNodeName(node)])) {
					node.checked = true;
				} else {
					node.checked = false;
				}
			} else {
				node.checked = false;		
			}
		}
	}
	
	function defaultDeserializeTextArea(formJSON, node, jsonObject) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("deserialize text area [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
		}
		
		if (jsonObject[FormJSONUtil.resolveNodeName(node)]) {
			node.value = jsonObject[FormJSONUtil.resolveNodeName(node)];
		} else {
			node.value = "";
		}
	}
	
	function defaultDeserializeInputTypeSelect(formJSON, node, jsonObject) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("deserialize select [" + FormJSONUtil.resolveNodeName(node) + "]");
		}
		
		var optionSelectChildren = FormJSONUtil.findOptionSelectChildren(node);
		var optionFound = false;
		
		if (jsonObject[FormJSONUtil.resolveNodeName(node)]) {
			for (var optionItem in optionSelectChildren) {
				var option = optionSelectChildren[optionItem];
				var equalValues = (option.value == jsonObject[FormJSONUtil.resolveNodeName(node)]); 
				 
				if (equalValues) {
					option.selected = true;
					optionFound = true;
					break;
				}
			}
		} 
		
		if (!optionFound) {
			for (var optionItem in optionSelectChildren) {
				var option = optionSelectChildren[optionItem];
				var nullValue = FormJSONUtil.isNullValue(option.value) 
			
				if (nullValue) {
					option.selected = true;
					break;
				}
			}
		
		}
	}
		
	function defaultDeserializeOption(formJSON, node, jsonObject) {
		if (formJSON.getLogger().isDebugEnabled()) {
			formJSON.getLogger().log("deserialize option [" + FormJSONUtil.resolveNodeName(node) + ", " + node.value + "]");
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


/* Helper class for JSON building */

function JSONBuilder() {
	
	var jsonStructure = new Array();
	
	this.addProperty = function(name, value) {
		if (jsonStructure[name] == undefined) {
			jsonStructure[name] = new Array();
		}
		
		jsonStructure[name].push(value);
	}
	
	this.toJSONString = function() {
		var jsonString = "{ ";
		
		for (property in jsonStructure) {
			var valueArray = jsonStructure[property];
			
			jsonString += "\"" + property + "\"";
			jsonString += ": ";
			
			if (valueArray.length == 1) {
				jsonString += "\"" + FormJSONUtil.encodeJSONString(valueArray[0]) + "\"";
			} else {
				var valueArrayString = "[";
				
				for (value in valueArray) {
					valueArrayString += "\"" + FormJSONUtil.encodeJSONString(valueArray[value]) + "\"";
					valueArrayString += ", ";
				}
				
				valueArrayString = valueArrayString.substring(0, valueArrayString.lastIndexOf(","));
				
				valueArrayString += "]";
				
				jsonString += valueArrayString;
			}
				
			jsonString += ", ";
		}
		
		jsonString = jsonString.substring(0, jsonString.lastIndexOf(","));
		
		jsonString += " }";
		
		return jsonString;
	}
	
	this.toJSON = function() {
		return eval("(" + this.toJSONString() + ")");
	}
	
}


/* Helper class with utility functions */

var FormJSONUtil = new function() {

	this.encodeJSONString = function(value) {
		var encoded = "";
		
		if (value) {
			for (var i = 0; i < value.length; i++) {
				var c = value.charAt(i);
				
				if (c == "\"") {
					encoded += "\\";
				} else if (c == "\\") {
					encoded += "\\";
				} else if (c == "/") {
					encoded += "\\";
				}
				
				encoded += c;
			}
		}
		
		return encoded;
	}
	
	this.findSelectOptionParent = function(node) {
		var candidateParent = null;

		if (node) {
			candidateParent = node.parentNode;
		
			if (candidateParent) {
				if (candidateParent.nodeName == "SELECT") {
					return candidateParent;
				} else {
					return this.findSelectOptionParent(candidateParent);
				}
			}
		}
		
		return null;
	}
	
	this.findOptionSelectChildren = function(node) {
		var optionSelectChildren = new Array();
		
		findOptionSelectChildrenTraverseNodes(node, optionSelectChildren);
		
		return optionSelectChildren;
	}
	
	function findOptionSelectChildrenTraverseNodes(node, optionSelectChildren) {
		var childNodes = node.childNodes;
		
		for (var childNode in childNodes) {
			var candidateOption = childNodes[childNode];
			
			findOptionSelectChildrenVisitNode(candidateOption, optionSelectChildren);
						
			findOptionSelectChildrenTraverseNodes(candidateOption, optionSelectChildren);
		}
	}
	
	function findOptionSelectChildrenVisitNode(node, optionSelectChildren) {
		if (node.nodeName == "OPTION") {
			optionSelectChildren.push(node);
		}
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

function FormJSONException(msg) {

	this.message = msg;
	
	this.toString = function () {
		return this.message;
	}
	
}

