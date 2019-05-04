/*******************************************************************************
 * FORM SUBMISSIONS
 ******************************************************************************/

/**
 * This function will check it form on BasicPage.jsp has been submitted and is
 * called from the onsubmit.
 * 
 * @author it3jn@nwu.ac.za
 */
function checkFormSubmission() {
	if (window.submitted) {
		return false; // If the form has already been submitted don't attempt
		// a second submit.
	} else {
		window.submitted = window.lockOnSubmit ? true : false;
		return true; // submit the form.
	}
}

/**
 * Submits the form and sets the value of submitted
 * 
 * @author it3jn@nwu.ac.za
 */
function submitForm() {
	if (!window.submitted) {
		window.submitted = true; // force lockOnSubmit
		document.getElementById(cachedForm==""?"basicForm":cachedForm).submit(); // submit the form.
	}
}

function setCmdValue(value) {
	var form = document.getElementById(cachedForm==""?"basicForm":cachedForm);
	form.cmd.value = value;
}

function sumbitFormWithoutForcingLockOnSubmit() {
	if (!window.submitted) {
		document.getElementById(useForm(this.focusWidgetID)).submit(); // submit the form.
	}
}

/**
 * This method handles all the onchange events of the various input fields.
 * 
 * @param hasFieldChangeListeners
 * @param fieldname
 * @author it3iswg@nwu.ac.za
 */
function setFieldsDirty() {
	document.getElementById(useForm(this.focusWidgetID)).fieldsDirty.value = "true";
	document.getElementById(useForm(this.focusWidgetID)).cycleDirty.value = "true";
}

/**
 * This method handles all the onchange events of the various input fields.
 * 
 * @param hasFieldChangeListeners
 * @param fieldname
 * @author it3jn@nwu.ac.za
 */
function fieldValueChanged(fieldname) {
	fieldValueChangedIfApplied(fieldname, true);
}

/**
 * This method handles all the onchange events of the various input fields.
 * 
 * @param hasFieldChangeListeners
 * @param fieldname
 * @param doFieldsDirty
 * @author it3jn@nwu.ac.za
 */
function fieldValueChangedIfApplied(fieldname, doFieldsDirty) {
	if (doFieldsDirty) {
	 	setFieldsDirty();
	}
	document.getElementById(useForm(this.focusWidgetID)).userChangedFieldName.value = fieldname;
	document.getElementById(useForm(this.focusWidgetID)).cmd.value = " ";
	submitForm(); // TODO: giving a problem with SBL -> "Skep Transaksie"
	// document.forms[0].submit(); //Change to this if problems exists
}
 
/**
 * This method handles all the onBlur events of the various input fields.
 * 
 * @param fieldname
  */
function fieldOnTab(event, fieldname) {
	if (event && (event.keyCode == 9)) {
		setFieldsDirty();
	 	document.getElementById(useForm(this.focusWidgetID)).userChangedFieldName.value = fieldname;
	 	document.getElementById(useForm(this.focusWidgetID)).cmd.value = " ";
	 	document.getElementById(useForm(this.focusWidgetID)).submit();
	}
}

/**
 * This is an alternative to {fieldOnTab(event, fieldname)} used with onChange event 
 * in conjunction with AJAX calls on {SearchableListField.jsp} page. This is to prevent 
 * out of order event execution causing incorrect data in back-end. 
 * 
 * @param fieldname
 * @returns
 */
function fieldOnChange(fieldname) {
	setFieldsDirty();
 	document.getElementById(useForm(this.focusWidgetID)).userChangedFieldName.value = fieldname;
 	document.getElementById(useForm(this.focusWidgetID)).cmd.value = " ";
 	document.getElementById(useForm(this.focusWidgetID)).submit();
}

/**
 * This method checks if any of the child nodes are empty.
 * 
 * @param nodes
 * @author it3iswg@nwu.ac.za
 */
function hasEmptyInput(nodes, id) {
	for (var i = 0; i < nodes.length; i++) {
		var item = nodes[i];
		if ((item != null) && (item.id != id)) {
			if (item.hasChildNodes()) {
				if (hasEmptyInput(item.childNodes, id)) {
					return true;
				}
			} else {
				if ((item.id != "") && (item.attributes != null)) {
					var typeAtt = item.attributes.getNamedItem("type");
					if ((typeAtt != null) && (typeAtt.value == "text")) {
						var readAtt = item.attributes.getNamedItem("readonly");
						if ((readAtt == null) || (readAtt.value != "readonly")) {
							if (item.value == "") {
								return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}

/**
 * This method submits the form only if all fields on current panel has values.
 * 
 * @param fieldname
 * @param id
 * @author it3iswg@nwu.ac.za
 */
function allFieldsValueChanged(fieldname, id) {
	setFieldsDirty();
	var element = document.getElementById(id);
	var nodes = element.parentNode.parentNode.parentNode.childNodes;
	if (!hasEmptyInput(nodes, id)) {
		document.getElementById(useForm(this.focusWidgetID)).userChangedFieldName.value = fieldname;
		document.getElementById(useForm(this.focusWidgetID)).cmd.value = " ";
		submitForm();
	}
}

/**
 * Finds a node in the given nodes
 * that has the given nodename and a att
 * with the specified value.
 * Note: this function works from the last child backwards 
 * and it will return the first node it finds with the 
 * given criteria.
 * 
 * @param nodes The node who's children will be inspected
 * @param nodeName The name of the nodes to look at
 * @param att the attribute name
 * @param attValue The attribute value.
 * @param checkSameLengthValue Default to false. If this is true then the attribute
 * value will be substringed to the same length (if longer) then the given value
 * before checked.
 * @return the node with the given values
 */
function findNodeWithAtt(nodes, nodeName, att, attValue, checkSameLengthValue){
	for(var i = (nodes.length - 1); i >= 0; i--){
 		var currentNode = nodes[i];
 		if(currentNode.nodeName == nodeName && currentNode.attributes.getNamedItem(att) != null){
 			var nodeAttValue = currentNode.attributes.getNamedItem(att).value;
 			if(nodeAttValue != null && checkSameLengthValue
 					&& nodeAttValue.length > attValue.length){
 				nodeAttValue = nodeAttValue.substring(0, attValue.length);
 			}
 			if(nodeAttValue == attValue){
 				return currentNode;
 			}
 		}
 		if(currentNode.hasChildNodes()){
 			var rtn = findNodeWithAtt(currentNode.childNodes, nodeName, att, attValue, checkSameLengthValue);
 			if(rtn != null){
 				return rtn;
 			}
 		}
 	}
 	return null;
}

/*******************************************************************************
 * CALENDER
 ******************************************************************************/

// Popup a calendar window.
function isValidDate(dateStr) {
	var validformat = /^\d{4}\/\d{2}\/\d{2}$/
	var yyyy = dateStr.substring(0, 4);
	var mm = dateStr.substring(4, 6);
	var dd = dateStr.substring(6, 8);
	var dtStr = yyyy + "/" + mm + "/" + dd;

	if (!validformat.test(dtStr)) {
		return false;
	} else {
		var yearfield = dtStr.split("/")[0];
		var monthfield = dtStr.split("/")[1];
		var dayfield = dtStr.split("/")[2];
		var dayobj = new Date(yearfield, monthfield - 1, dayfield);

		if ((dayobj.getMonth() + 1 != monthfield)
				|| (dayobj.getDate() != dayfield)
				|| (dayobj.getFullYear() != yearfield)) {
			return false;
		} else if ((parseFloat(yearfield) < 1900)
				|| (parseFloat(yearfield) > 2100)) {
			return false;
		}
	}
	return true;
}

/*******************************************************************************
 * SEARCHABLE LISTFIELDS
 ******************************************************************************/

/*
 * Selects that option in the select field whose key appears in the key field.
 */
function setSelectedFromKey(selectField, keyField) {
	 var found = false;
	 options = selectField.options;
	 for (o = 0; o < options.length; o++) {
		 if (options[o].value == keyField.value) {
			 selectField.selectedIndex = o;
			 found = true;
			 break;
		 }
	 }
	 if(!found){
		 selectField.selectedIndex = 0;
	 }
	 return found;
}

/*
 * Sets the key field's value to the key of the select field's selected option.
 */
function setKeyFromSelected(keyField, selectField) {
	keyField.value = selectField.options[selectField.selectedIndex].value;
	keyField.onchange();
}

/*******************************************************************************
 * CHECKLISTFIELDS
 ******************************************************************************/

// Checks all checkboxes identified by the specified name
function checkAll(name) {
	setCheckboxState(name, true);
}

// Unchecks all checkboxes identified by the specified name
function uncheckAll(name) {
	setCheckboxState(name, false);
}

// Sets the state of all checkboxes identified by the specified name
function setCheckboxState(name, newState) {
	forms = document.forms;
	for (f = 0; f < forms.length; f++) {
		elements = forms[f].elements;
		for (e = 0; e < elements.length; e++) {
			if (elements[e].name == name) {
				elements[e].checked = newState;
			}
		}
	}
}

/*******************************************************************************
 * UTILITIES
 ******************************************************************************/

// Click the specified button in stead of submitting if the Enter key was
// pressed.
function clickButtonOnEnter(event, button) {
	if (event && button && (event.which == 13 || event.keyCode == 13)) {
		if (button.length) {
			button[0].click();
		} else {
			button.click();
		}
		return false;
	} else {
		return true;
	}
}

// Adds Maxlength functionality to textArea
function setMaxLength() {
	var x = document.getElementsByTagName('textarea');
	for (var i = 0; i < x.length; i++) {
		if (x[i].getAttribute('maxlength')) {
			x[i].onkeyup = x[i].onchange = checkMaxLength;
		}
	}
}

function checkMaxLength() {
	this.form.fieldsDirty.value = true;
	this.form.cycleDirty.value = true;
	var maxLength = this.getAttribute('maxlength');
	var currentLength = this.value.length;
	if (currentLength > maxLength) {
		this.value.length = maxLength;
		this.value = this.value.substring(0, maxLength);
	}
}

function setAutoCompleteOff() {
	if (document.getElementsByTagName) {
		var inputElements = document.getElementsByTagName("input");
		for (i = 0; inputElements[i]; i++) {
			inputElements[i].setAttribute("autocomplete", "off");
		}// loop thru input elements
	}// basic DOM-happiness-check
}

function confirmButtonAction(msg) {
	var go = confirm(msg);
	if (go == true) {
		return true;
	} else {
		document.getElementById(useForm(this.focusWidgetID)).cmd.value = ' ';
		return false;
	}
}

function openWindow(url) {
	window.open(url);
}

function useForm(fieldId) {
	if (document.forms.length == 1) {
		return "basicForm";
	} else {
		var element = document.getElementById(fieldId);
		var formName = findForm(element);
		cachedForm = formName.toString();
		return formName.toString();
	}
}

function findForm(element) {
	var theNode = element.parentNode;
	var formName = "";
	while (new Boolean(false)) {
		theNode = theNode.parentNode;
		if (theNode.id.toString() == "basicForm") {
			formName = "basicForm";
			break;
		} else if (theNode.id.toString() == "securityForm") {
			formName = "securityForm"
			break;
		}
	}
	return formName;
}

/**
 * Sets the focus on the named element in the document, if it exists.
 * 
 * @param The ID of the HLTML element to revceive focus.
 * @see BasicPage.jsp - onload(); BasicPage.jsp - requestFocus();
 */
function focusOn(id) {
	element = document.getElementById(id);
	if (element) {
		if (element.type != 'hidden'){ //IT3MT bug10879 20081015
			element.focus();
		}
	}
}

function requestFocus(fieldid, force) {
	if ((focusWidgetID == '') || (force == true)) {
		focusWidgetID = fieldid;
	}
}

/**
 * Set field contents to either uppercase or lowercase.
 *
 * Usage Example:
 *   <input type="text" onkeyup="setTextCase(this,true);" />
 * 
 * @author Wayne Tolken
 * @param <code>field</code> The HTML element which uses this function.
 * @param <code>toupper</code> If TRUE sets field contents to uppercase otherwise sets field contents to lowercase.
 */
function setTextCase(field, toupper) {
    if (toupper) {
        field.value = field.value.toUpperCase();
    } else {
        field.value = field.value.toLowerCase();
    }
}
 
/**
 * Hides the element for the id.
 * @param id
 * @return
 */
function hideElementById(id) {
	//safe function to hide an element with a specified id
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'none';
		}
		else { // IE 4
			document.all.id.style.display = 'none';
		}
	}
}

/**
 * Displays the element for the id.
 * @param id
 * @return
 */
function showElementById(id) {
	//safe function to show an element with a specified id
		  
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'block';
	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'block';
		}
		else { // IE 4
			document.all.id.style.display = 'block';
		}
	}
}



/**
 * Set the state readonly.
 */
function disableField(id) {
	 var element = document.getElementById(id);
	 if (element != null){
		 element.disabled=true;
	 }
}

/**
* Set the state readonly.
*/
function enableField(id) {
	var element = document.getElementById(id);
	 if (element != null){
		 element.disabled=false;
	 }
}

function popupCalendar(event, fieldid, initdate, pattern) {
	var width = 215;
	var height = 200;
	var x = event.screenX - width / 2;
	var y = event.screenY - height / 2;
	   
	if(!isValidDate(initdate)) {		// it3mzt_20070206_bugzilla_5418/5429
		var currentDate = new Date();
		var currentDateFormatted = currentDate.toISOString().slice(0,10).replace(/-/g,"/");
		initdate = currentDateFormatted;
	} else {
		initdate = initdate.substring(0,4) + "/" + initdate.substring(4,6) + "/" + initdate.substring(6,8);
	}
	window.open(document.location.origin + contextPath +'/resources/calendar.jsp?' + 'fieldid=' + fieldid + '&initdate=' + initdate + '&pattern=' + pattern + '&stylesheet=' + contextPath + '/resources/nwu.css',
	      fieldid,
	      "toolbar=no,menubar=no,status=no,resizable=yes,width=" + width + ",height=" + height + ",left=" + x + ",top=" + y + ",screenX=" + x + ",screenY=" + y);
}
	
// Popup a file upload window (for exmaple used in SCA and SBL).
function popupUpload(event, fieldid, serverFolder, uploadPath, stylesheet) {
	var width = 400;
	var height = 140;
	var x = event.screenX - width / 2;
	var y = event.screenY - height / 2;
	window.open(document.location.origin + contextPath + '/resources/upload.jsp?'
		+ 'fieldid=' + fieldid
		+ '&uploadPath=' + uploadPath
		+ '&serverFolder=' + serverFolder
		+ '&stylesheet=' + contextPath + '/resources/nwu.css',
	      fieldid,
	      "toolbar=no,menubar=no,status=no,resizable=yes,width=" + width + ",height=" + height + ",left=" + x + ",top=" + y + ",screenX=" + x + ",screenY=" + y);
}
 
// Popup a file upload window (for Electronic Documents).
function popupElectronicDocumentUpload(event, fieldid, docOwner, docType, uploadPathElectronicDocument) {
	var width = 460;
	var height = 270;
	var x = event.screenX - width / 2;
	var y = event.screenY - height / 2;
	window.open(document.location.origin + contextPath +'/resources/uploadElectronicDocument.jsp?'
            + 'fieldid=' + fieldid
            + '&uploadPath=' + uploadPathElectronicDocument
            + '&docOwner=' + docOwner
            + '&docType=' + docType
            + '&stylesheet=' + contextPath + '/resources/nwu.css',
	      fieldid,
	      "toolbar=no,menubar=no,status=no,resizable=yes,width=" + width + ",height=" + height + ",left=" + x + ",top=" + y + ",screenX=" + x + ",screenY=" + y);
}