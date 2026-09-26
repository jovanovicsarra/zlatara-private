from pathlib import Path
p=Path('index.html')
s=p.read_text(encoding='utf-8')
s=s.replace('<p class="legal-note">Pre konačnog puštanja kartičnog plaćanja u rad potrebno je ovde dopuniti registrovani naziv prodavca, PIB, matični broj i tačne uslove isporuke.</p>','<p class="legal-note">Za dodatne informacije pre kupovine možete nas kontaktirati na 069 213 1555.</p>')
s=s.replace('<p class="legal-note">Pre aktivacije naplate treba uneti tačnu cenu i rok dostave, adresu za povraćaj i formalnu proceduru reklamacije.</p>','<p class="legal-note">Za pitanja o dostavi, povraćaju ili reklamaciji kontaktirajte nas na 069 213 1555 pre slanja robe nazad.</p>')
s=s.replace('<p class="legal-note">Pre konačnog puštanja u rad potrebno je dopuniti identitet rukovaoca podacima, kontakt za zahteve lica i rokove čuvanja podataka.</p>','<p class="legal-note">Za pitanja u vezi sa podacima koje ste ostavili uz porudžbinu možete nas kontaktirati na 069 213 1555.</p>')
p.write_text(s,encoding='utf-8')
