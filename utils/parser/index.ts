import axios from "axios";
import {DOMParser} from "@xmldom/xmldom"

export const ParseXmlContent = async (xmlContentLink: {
    url: string;
    languageName: string;
    languageCode: string;
    isTranslatable: boolean
}): Promise<{ text: string, timeStamp: string }[] | null> => {
    try {
        const stringtoparse = await axios.get(xmlContentLink.url)
        const parse = new DOMParser()
        const doc = parse.parseFromString(stringtoparse.data, "application/xml")
        const textElement = doc.getElementsByTagName("text")
        const result = []
       
        for (let i = 0; i < textElement.length; i++) {
            const startTimeStamp = textElement[i].getAttribute("start");
            const textContent = textElement[i].textContent;
            if (startTimeStamp && textContent) {
                result.push({
                    text: textContent,
                    timeStamp: startTimeStamp
                })
            }
        }
        return result;
    } catch (err) {
        console.log(err)
        return null
    }
}