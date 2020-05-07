/**baris demir
 * ozeldersveriyorum.com
 * botcex.com
 */
import axios from 'axios';
import * as convert from 'xml-js';

export async function TCM_Actual_Exchange(currency = "") {

    const response = await axios.get('https://www.tcmb.gov.tr/kurlar/today.xml');
    const result = await convert.xml2js(
        response.data,
        {
            compact: true,
            ignoreDeclaration: true,
            ignoreInstruction: true
        }
    );
    const currencyList = result['Tarih_Date']['Currency'];
    const object = currencyList.map(currency => {
        return {
            CurrencyCode: currency['_attributes'].CurrencyCode,
            BuyForex: currency['ForexBuying']._text,
            SellForex: currency['ForexSelling']._text,
            BuyBanknot: currency['BanknoteBuying']._text,
            SellBanknot: currency['BanknoteSelling']._text,
        }
    });
    //return object;
    return currency != "all" ? object.find(item => item.CurrencyCode == currency) : object;
}