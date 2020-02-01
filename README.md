# multiEmailsInput
HTML input field for entering one or more emails.

## Installing

Add style file: 
```
<link rel="stylesheet" href="MultiEmail.css">
```
Add script file 'MultiEmails.js' before closing body tag: 
```
<script src="MultiEmails.js"></script>
```

Add attribute 'data-role' with value 'multiEmailsInput' or 
'multiEmailsInput--oneline' (for one email in line) in HTML input element, that you intend to use as multi emails input.

Attribute 'data-value' takes the initial array of emails to display on a page. 

## Example as following: 

```
<input type="text" 
       data-role="multiEmailsInput"
       data-value='["test0@gmail.com", "test1@gmail.com", "test2@gmail.com"]'>
```

