function clean(){
	document.getElementById('fname').value='';
	document.getElementById('lname').value='';
	document.getElementById('date').value='';
	document.getElementById('ft').value='';
	document.getElementById('uname').value='';
	var html = document.getElementById('html');
        html.checked = false;
    var python = document.getElementById('python');
        python.checked = false;
    var java = document.getElementById('java');
        java.checked = false;
    var cpp = document.getElementById('cpp');
        cpp.checked = false;
    var js = document.getElementById('js');
        js.checked = false;

}

function return_back(){
	let returnLink = document.createElement("a");
    returnLink.href = "html.html";
    returnLink.textContent = "Return to main screen";
    returnLink.style.position = "fixed";
    returnLink.style.top = "10px";
    returnLink.style.right = "10px";
    document.body.appendChild(returnLink);
}

function check(){
	var fname = document.getElementById('fname').value;
	var lname = document.getElementById('lname').value;
	var uname = document.getElementById('uname').value;
	var date = document.getElementById('date').value;
	var ft = document.getElementById('ft').value;
	
	var letters = /^[A-Za-z]+$/;
	var flag=true;
    if (!fname.match(letters)) {
        alert("Error. Please enter your first name with only alphabet letters.");
		document.getElementById('fname').value='';
		flag=false;
    }
    if (!lname.match(letters)) {
        alert("Error. Please enter your last name with only alphabet letters.");
		document.getElementById('lname').value='';
		flag=false;
    }
    if (date==""){
     alert("Error. Please enter your date of birth.");
     flag=false;
     }

     if (uname == ""){
     	alert("Error. Please enter username please.")
     	flag=false
     	return;
     }

    Object.keys(localStorage).forEach(function(key) { 
    		if(key==uname){
    			alert("Error. This username is already in the local storage. Please try a different one");
				document.getElementById('uname').value='';
    			flag=false;
    		}
    });
    

		if(flag==true){
		var fullname = "Firstname:" + fname + " Lastname:" + lname + " Username:" + uname;
		var key = localStorage.length + 1;
 		var paragraph = document.createElement('p');
 		var xhtml = document.getElementById('html').checked;
		var xpython = document.getElementById('python').checked;
		var xjava = document.getElementById('java').checked;
		var xcpp = document.getElementById('cpp').checked;
		var xjs = document.getElementById('js').checked;
		document.body.innerHTML = '';	
  		var checkedLanguages = [];
        	if (xhtml) {
            		checkedLanguages.push('HTML');
        		}
        	if (xpython) {
            		checkedLanguages.push('Python');
        		}
        	if (xjava) {
            		checkedLanguages.push('Java');
        		}
        	if (xcpp) {
            		checkedLanguages.push('C++');
        		}
        	if (xjs) {
            		checkedLanguages.push('JavaScript');
        		}
			paragraph.innerHTML ="<h1><u> Resume </u></h1>"+"<br>" + "<b>Full name:</b> " + fname +' '+ lname+ "<br>"
			+ "<b>Date of birth:</b>"+' ' + date + "<br>" + "<b>Description:</b> " + "<br>" + ft.replace(/\n/g, "<br>") 
			+ "<br>"+ "<b>Programming Languages:</b> " + checkedLanguages.join(', ');
            document.body.appendChild(paragraph);
            localStorage.setItem(uname,fullname);

            processInfo(uname,fname,lname,ft,date,checkedLanguages);
	return_back();
    }
}


function show() {
	  var students = getStudentsDb();
	  if (students.length == 0) {
		alert("Error. No users found.");
	  } else {
		document.body.innerHTML = '';
		students.forEach(function(student) {
		var element = document.createElement('p');
		element.innerHTML = '<b>Username:</b> ' + student[0] + ' | <b>First Name:</b> ' + student[1] + ' | <b>Last Name:</b> ' + student[2];
		document.body.appendChild(element);
	});
		let ResumeShow = document.createElement("input");
		document.body.appendChild(ResumeShow);
		let Resumebtn = document.createElement("button");
		Resumebtn.innerHTML = "Show Resume";
		document.body.appendChild(Resumebtn);

	Resumebtn.addEventListener('click', function() {
	  var username = ResumeShow.value;
	  var resume = localStorage.getItem(username);
	  if (resume) {
		var CurrentResume = document.createElement('div');
		var title = document.createElement('h1');
		title.textContent = "Resume for " + username + ":";
		CurrentResume.appendChild(title);
		var element = document.createElement('p');
		element.textContent = resume + '\n';
		CurrentResume.appendChild(element);
		var formerResume = document.querySelector('#resume');
		if (formerResume) {
		  formerResume.parentNode.replaceChild(CurrentResume, formerResume);
		} else {
		  document.body.appendChild(CurrentResume);
		}
		CurrentResume.id = "resume";
	  } else {
		alert("Resume not found for: " + username);
		ResumeShow.value="";
	  }
		});
		return_back();
	  }	
}
