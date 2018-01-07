import React, { Component } from 'react';


class NewNote extends Component {
  /*
  constructor() {
    super();
    this.onSubmit.bind(this);
  }

  onSubmit(event) {
    
  }
  */

  render() {
    return (
      <div className="row">
        <form className="form-inline new-note align-items-center" onSubmit={ this.props.onSubmit } >
          <label className="sr-only" htmlFor="language">Language</label>
          <select className="form-control mb-sm-2 mr-sm-2" name="language">
            <option value="af">Afrikaans</option>
            <option value="sq">Albanian</option>
            <option value="ar">Arabic</option>
            <option value="es-ar">Argentinian Spanish</option>
            <option value="ast">Asturian</option>
            <option value="en-au">Australian English</option>
            <option value="az">Azerbaijani</option>
            <option value="eu">Basque</option>
            <option value="be">Belarusian</option>
            <option value="bn">Bengali</option>
            <option value="bs">Bosnian</option>
            <option value="pt-br">Brazilian Portuguese</option>
            <option value="br">Breton</option>
            <option value="en-gb">British English</option>
            <option value="bg">Bulgarian</option>
            <option value="my">Burmese</option>
            <option value="ca">Catalan</option>
            <option value="es-co">Colombian Spanish</option>
            <option value="hr">Croatian</option>
            <option value="cs">Czech</option>
            <option value="da">Danish</option>
            <option value="nl">Dutch</option>
            <option value="en">English</option>
            <option value="eo">Esperanto</option>
            <option value="et">Estonian</option>
            <option value="fi">Finnish</option>
            <option value="fr">French</option>
            <option value="fy">Frisian</option>
            <option value="gl">Galician</option>
            <option value="ka">Georgian</option>
            <option value="de">German</option>
            <option value="el">Greek</option>
            <option value="he">Hebrew</option>
            <option value="hi">Hindi</option>
            <option value="hu">Hungarian</option>
            <option value="is">Icelandic</option>
            <option value="io">Ido</option>
            <option value="id">Indonesian</option>
            <option value="ia">Interlingua</option>
            <option value="ga">Irish</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="kn">Kannada</option>
            <option value="kk">Kazakh</option>
            <option value="km">Khmer</option>
            <option value="ko">Korean</option>
            <option value="lv">Latvian</option>
            <option value="lt">Lithuanian</option>
            <option value="dsb">Lower Sorbian</option>
            <option value="lb">Luxembourgish</option>
            <option value="mk">Macedonian</option>
            <option value="ml">Malayalam</option>
            <option value="mr">Marathi</option>
            <option value="es-mx">Mexican Spanish</option>
            <option value="mn">Mongolian</option>
            <option value="ne">Nepali</option>
            <option value="es-ni">Nicaraguan Spanish</option>
            <option value="nb">Norwegian Bokmål</option>
            <option value="nn">Norwegian Nynorsk</option>
            <option value="os">Ossetic</option>
            <option value="fa">Persian</option>
            <option value="pl">Polish</option>
            <option value="pt">Portuguese</option>
            <option value="pa">Punjabi</option>
            <option value="ro">Romanian</option>
            <option value="ru">Russian</option>
            <option value="gd">Scottish Gaelic</option>
            <option value="sr">Serbian</option>
            <option value="sr-latn">Serbian Latin</option>
            <option value="zh-hans">Simplified Chinese</option>
            <option value="sk">Slovak</option>
            <option value="sl">Slovenian</option>
            <option value="es">Spanish</option>
            <option value="sw">Swahili</option>
            <option value="sv">Swedish</option>
            <option value="ta">Tamil</option>
            <option value="tt">Tatar</option>
            <option value="te">Telugu</option>
            <option value="th">Thai</option>
            <option value="zh-hant">Traditional Chinese</option>
            <option value="tr">Turkish</option>
            <option value="udm">Udmurt</option>
            <option value="uk">Ukrainian</option>
            <option value="hsb">Upper Sorbian</option>
            <option value="ur">Urdu</option>
            <option value="es-ve">Venezuelan Spanish</option>
            <option value="vi">Vietnamese</option>
            <option value="cy">Welsh</option>
          </select>
          
          <label className="sr-only" htmlFor="word">Word</label>
          <input type="text" className="form-control mb-sm-2 mr-sm-2" name="word" placeholder="word" />
          
          <label className="sr-only" htmlFor="definition">Definition</label>
          <input type="text" className="form-control mb-sm-2 mr-sm-2" name="definition" placeholder="definition" />

          <label className="sr-only" htmlFor="context">Context</label>
          <input type="text" className="form-control mb-sm-2 mr-sm-2" name="context" placeholder="context" />

          <button type="submit" className="btn btn-primary mb-sm-2 mr-sm-2">+</button>
          
        </form>
      </div>
    );
  }
}

export default NewNote;
