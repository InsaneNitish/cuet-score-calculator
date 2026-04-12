import * as cheerio from 'cheerio';

export function parseResponseSheet(htmlString) {
  const $ = cheerio.load(htmlString);

  let candidateName = 'Unknown';
  let rollNumber = 'Unknown';

  // Extract Candidate Name and Roll No from header tables
  $('td').each((i, el) => {
    const tdText = $(el).text().trim();
    if (/Candidate Name/i.test(tdText) && candidateName === 'Unknown') {
      candidateName = $(el).next('td').text().trim() || 'Unknown';
    }
    if (/Roll No/i.test(tdText) && rollNumber === 'Unknown') {
      rollNumber = $(el).next('td').text().trim() || 'Unknown';
    }
  });

  const questions = [];

  // Parse using .menu-tbl if available (Standard Digialm Format)
  $('.menu-tbl').each((i, table) => {
    const text = $(table).text().replace(/\s+/g, ' '); 
    const extractMatch = (regex) => {
      const match = text.match(regex);
      return match ? match[1].trim() : null;
    };

    const questionIdMatch = text.match(/Question ID\s*:\s*(\d+)/);
    if (!questionIdMatch) return;
    const questionId = questionIdMatch[1];

    const option1Id = extractMatch(/Option 1 ID\s*:\s*(\d+)/);
    const option2Id = extractMatch(/Option 2 ID\s*:\s*(\d+)/);
    const option3Id = extractMatch(/Option 3 ID\s*:\s*(\d+)/);
    const option4Id = extractMatch(/Option 4 ID\s*:\s*(\d+)/);

    let status = 'Not Answered';
    if (/Status\s*:\s*Answered/i.test(text)) {
      status = 'Answered';
    } else if (/Status\s*:\s*Not\s*Answered/i.test(text)) {
      status = 'Not Answered';
    } else {
      const statusMatch = text.match(/Status\s*:\s*([A-Za-z\s]+)(?=Chosen|\b)/);
      if (statusMatch) {
         status = statusMatch[1].trim();
      }
    }

    const chosenOption = extractMatch(/Chosen Option\s*:\s*(\d)/);

    const q = { questionId, option1Id, option2Id, option3Id, option4Id, status, chosenOption };
    
    // Map chosenOption to its respective ID
    if (chosenOption && ['1', '2', '3', '4'].includes(chosenOption)) {
      q.chosenOptionId = q[`option${chosenOption}Id`] || null;
    } else {
      q.chosenOptionId = null;
    }
    
    questions.push(q);
  });

  // Fallback if .menu-tbl array is empty (e.g. customized or raw text paste)
  if (questions.length === 0) {
    const text = $('body').text().replace(/\s+/g, ' '); 
    const chunks = text.split(/Question ID\s*:\s*/).slice(1);

    for (const chunk of chunks) {
      const extractMatch = (regex) => {
        const match = chunk.match(regex);
        return match ? match[1].trim() : null;
      };

      const questionIdMatch = chunk.match(/^(\d+)/);
      if (!questionIdMatch) continue;
      const questionId = questionIdMatch[1];
      
      const option1Id = extractMatch(/Option 1 ID\s*:\s*(\d+)/);
      const option2Id = extractMatch(/Option 2 ID\s*:\s*(\d+)/);
      const option3Id = extractMatch(/Option 3 ID\s*:\s*(\d+)/);
      const option4Id = extractMatch(/Option 4 ID\s*:\s*(\d+)/);

      let status = 'Not Answered';
      if (/Status\s*:\s*Answered/i.test(chunk)) {
        status = 'Answered';
      } else if (/Status\s*:\s*Not\s*Answered/i.test(chunk)) {
        status = 'Not Answered';
      } else {
        const statusMatch = chunk.match(/Status\s*:\s*([A-Za-z\s]+)(?=Chosen|\b)/);
        if (statusMatch) {
           status = statusMatch[1].trim();
        }
      }

      const chosenOption = extractMatch(/Chosen Option\s*:\s*(\d)/);

      const q = { questionId, option1Id, option2Id, option3Id, option4Id, status, chosenOption };
      
      if (chosenOption && ['1', '2', '3', '4'].includes(chosenOption)) {
        q.chosenOptionId = q[`option${chosenOption}Id`] || null;
      } else {
        q.chosenOptionId = null;
      }
      
      questions.push(q);
    }
  }

  return { candidateName, rollNumber, questions };
}
