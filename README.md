# multi-emails-input
HTML input field for entering one or more emails.

## Installing

Add style file: 
```
<link rel="stylesheet" href="multi-email.css">
```
Add script file 'multi-emails.js' before closing body tag: 
```
<script src="multi-emails.js"></script>
```

Add attribute 'data-role' with value 'multi-emails-input' or 
'multi-emails-input--oneline' (for one email in line) in HTML input element, that you intend to use as multi emails input.

Attribute 'value' takes the initial list of emails separated by coma to display on a page. 

## Example as following: 

```
<input type="text" 
       data-role="multi-emails-input"
       value='test0@gmail.com,test1@gmail.com,test2@gmail.com'>
```

