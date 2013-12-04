function readfile(f, obj)
{	
	var reader = new FileReader();
	reader.readAsText(f);
	reader.onload = function ()
	{
		var text = reader.result;
		obj.value = "";
		obj.value = text;
	};
	reader.onerror = function(e)
	{
		console.log("Error", e);
	};
}
function main(cipher, enc)
{
	if(cipher)
	{
		var key = V.key.value;
		var source = V.input.value;
		if(key.length==0) 
			alert("Введите ключ");
		else
		{
			key = key_conv(key);
			if(key.length==0)
				alert("Ключ не содержит символов Латинского алфавита");
			else
				if(source.length==0)
					alert("Введите строку");
				else
					if(!enc)
						V.output.value = Vigenere_enc(key.toUpperCase(), source);
					else
						V.output.value = Vigenere_dec(key.toUpperCase(), source);
		}
	}
	else
	{
		var key = parseInt(C.key.value, 10);
		var source = C.input.value;
		if(isNaN(key)) 
			alert("Введите ключ");
		else
			if(source.length==0)
				alert("Введите строку");
			else
				if(!enc)
					C.output.value = Caesar(key%26, source);
				else
					C.output.value = Caesar((key%26)*(-1), source);
	}
}

function Caesar (key, source)
{
	var result="";
	var aCode = "a".charCodeAt(0);
	var ACode = "A".charCodeAt(0);
	var zCode = "z".charCodeAt(0);
	var ZCode = "Z".charCodeAt(0);
	var sCode;
	for (i = 0; i < source.length; i++)
	{
		sCode=source.charCodeAt(i);	
		if ((sCode >= aCode) && (sCode <= zCode))
		{
			sCode += key;
			if(sCode > zCode)
				sCode -= 26;
			if(sCode < aCode)
				sCode += 26;
		}	
		else				
			if ((sCode >= ACode) && (sCode <= ZCode))
			{
				sCode += key;
				if(sCode > ZCode)
					sCode -= 26;
				if(ch < ACode)
					sCode += 26;
			}
		result += String.fromCharCode(sCode);
	}
	return result;
}

function key_conv (key)
{
	key_out = "";
	var aCode = "a".charCodeAt(0);
	var ACode = "A".charCodeAt(0);
	var zCode = "z".charCodeAt(0);
	var ZCode = "Z".charCodeAt(0);
	var sCode;
	for(i = 0; i < key.length; i++)
    {
		sCode = key.charCodeAt(i);
		if(sCode >= ACode && sCode <= ZCode)
			key_out += String.fromCharCode(sCode);
		else 
			if(sCode >= aCode && sCode <= zCode)
				key_out += String.fromCharCode(sCode).toUpperCase();
    }
	return key_out;
}
 
function Vigenere_factory(action_function)
{
    return function(key, text){
        out = "";
        var aCode = "a".charCodeAt(0);
        var ACode = "A".charCodeAt(0);
        var zCode = "z".charCodeAt(0);
        var ZCode = "Z".charCodeAt(0);
        var sCode;
        var kCode;
        for(i = 0, j = 0; i < text.length; i++)
        {
            sCode = text.charCodeAt(i);
            kCode = key.charCodeAt(j);
            if(sCode >= aCode && sCode <= zCode)
                sCode += ACode - aCode;
            
            if(sCode >= ACode && sCode <= ZCode)
            {
                out += action_function(sCode, kCode, ACode);
                j = (j + 1) % key.length;
            }
            else
                out += text.charAt(i);
            }
        return out;
    }
}

var Vigenere_enc = Vigenere_factory(function(sCode, kCode, ACode){
    return String.fromCharCode((sCode + kCode - 2*ACode) % 26 + ACode); 
}); 

var Vigenere_dec = Vigenere_factory(function(sCode, kCode, ACode){
    return String.fromCharCode((sCode - kCode + 26) % 26 + ACode); 
});
