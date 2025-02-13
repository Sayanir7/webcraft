// imageUtils.js

export function generateRandomNumber(min, max) {
    if (min > max) {
      throw new Error("Min should be less than or equal to Max");
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  export function extractAltKeywords(htmlContent) {
    const keywords = [];
    const imgRegex = /<img [^>]*alt="(.*?)"[^>]*>/g;
    let match;
  
    while ((match = imgRegex.exec(htmlContent)) !== null) {
      keywords.push(match[1]);
    }
  
    return keywords;
  }
  
  // export function replaceImagePlaceholdersUsingAlt(htmlContent, keywordImages) {
  //   const imgRegex = /<img src=".*?" alt="(.*?)" .*?>/g;
  
  //   return htmlContent.replace(imgRegex, (match, altText) => {
  //     if (keywordImages[altText]) {
  //       return match.replace(/src=".*?"/, `src="${keywordImages[altText]}"`);
  //     }
  //     return match;
  //   });
  // }

  // export  function replaceImagePlaceholdersUsingAlt(htmlContent, keywordImages) {
  //   // Improved regex to match <img> tags with alt attributes
  //   const imgRegex = /<img\s+[^>]*alt=["'](.*?)["'][^>]*>/g;
  
  //   return htmlContent.replace(imgRegex, (match, altText) => {
  //     // Normalize altText to prevent mismatches
  //     const normalizedAltText = altText.trim().toLowerCase();
  
  //     // Check if the normalized altText exists in keywordImages
  //     if (normalizedAltText in keywordImages) {
  //       const newSrc = keywordImages[normalizedAltText];
  //       return match.replace(/src=["'].*?["']/, `src="${newSrc}"`);
  //     }
  
  //     // If no match is found, return the original <img> tag
  //     return match;
  //   });
  // }
  

  
  
  export async function updateHtmlContent(htmlContent) {

    // const accessKey = import.meta.env.ImgAccessKey;
    // const cx = import.meta.env.ImgCx;

    // const accessKey = 'AIzaSyCkdl1G-gYQF2z04K2rNhmyrcTvwa1r0KI';
    // const cx = '0088d61d5071241fb';
    
    const accessKey = 'AIzaSyATeAJwdoWzjG_xXEAojAaTEwTTaFvjyQw';
    const cx = '4188e9c9cf0654ef6';
    const keywords = extractAltKeywords(htmlContent);
    const keywordImages = {};
    const index = generateRandomNumber(0, 9);
  
    const fetchImages = async (keyword) => {
      try {
        const response = await fetch(
          `https://customsearch.googleapis.com/customsearch/v1?q=${keyword}&cx=${cx}&key=${accessKey}&searchType=image`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const validIndex = Math.min(index, data.items.length - 1);
          keywordImages[keyword] = data.items[validIndex].link;
        } else {
          keywordImages[keyword] = 'No image found';
        }
      } catch (err) {
        console.error('Error fetching images for', keyword, err);
        keywordImages[keyword] = 'Error fetching image';
      }
    };
  
    await Promise.all(keywords.map(fetchImages));
  
    // Replace image placeholders in the HTML content
    htmlContent = htmlContent.replace(/<img\s+[^>]*alt=["'](.*?)["'][^>]*>/g, (match, altText) => {
      const normalizedAltText = altText.trim();
      if (normalizedAltText in keywordImages) {
        const newSrc = keywordImages[normalizedAltText];
        return match.replace(/src=["'].*?["']/, `src="${newSrc}"`);
      } else {
        console.log("no match found");
        return match;
      }
    });
  
    // console.log(keywordImages);
    // console.log(htmlContent);
  
    return htmlContent;
  }
  



//   https://customsearch.googleapis.com/customsearch/v1?q=samsung&cx=4188e9c9cf0654ef6&key=AIzaSyATeAJwdoWzjG_xXEAojAaTEwTTaFvjyQw&searchType=image