import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom';
import {
  ExpandMore,
} from '@material-ui/icons';

function FAQ() {

  const questions = [
    {
      q: 'Why can I only see part of a list that is shared with me?',
      a: 'You can see the full list once a Pair Care account is created or you are logged into your Pair Care account.',
    },
    {
      q: 'Can I create a list without an account?',
      a: 'A Pair Care account is required to create a list. Create a free account by clicking ',
      link: {label: 'here', to: '/register'}
    },
    {
      q: 'How do I create a list?',
      a: 'When you\'re logged in to your account, click on the add icon (+) at the bottom center of the page. You will then be able to enter item details for your recommended items.',
    },
    {
      q: 'Do I need to enter information before I can save an item to my list?',
      a: 'There are four required fields: Category, Item Name, Link to purchase, and whether you recommend the item. However, by entering all fields you will make your list more informative for those you share with!',
    },
    {
      q: 'How do I edit an item?',
      a: 'On your list hover over the desired item and a pencil icon will appear under the item category. Click on the pencil icon to edit and update. Click “SAVE” on the bottom left hand of the section of the item that is edited to successfully make your update.',
    },
    {
      q: 'How do I delete an item?',
      a: 'On your list hover over the desired item and a trash bin icon will appear under the item category. Click on the trash bin icon to delete your item. You will be prompted to confirm by clicking “DELETE ITEM.” One confirmed the item will be removed from your list.',
    },
    {
      q: 'How do I share a list?',
      a: 'When you are ready to share your list, click on the share icon next to the right of the add icon located at the bottom center of the page. Enter the name, email, and even a custom message. Click the “ADD” button and you’ll see the receiver details recorded beneath the fields.',
    },
    {
      q: 'What happens when you edit the list of people you’ve shared with?',
      a: 'Click on the pencil icon to remove individual email addresses. Removing emails from a shared list is typically used for removing incorrectly entered email addresses. This will not recall shared lists and will not prevent lists you’ve already shared from being accessed by those you previously shared with.',
    },
    {
      q: 'Is there a limit to how many lists that I can share?',
      a: 'There is no limit. Share to your heart\'s content!',
    },
    {
      q: 'How do I see all the lists that are shared with me?',
      a: 'Click "Shared Lists" and sub-menu "Lists Shared With Me" in the navigation and you will be able to view all the lists others have shared with you, as well as Pair Care\'s list.',
    },
    {
      q: 'Can I add products from a list that is shared with me?',
      a: 'There are two ways to add items from a list that is shared with me:',
      a2: 'To add items individually - On a shared list hover over the desired item and an ADD icon (+) will appear under the item category. Click on the add icon to add that item to your list. The icon will change to a checkmark and a note that the item is on your list.',
      a3: 'To add multiple items within one shared list - Select all items that you want to add to your list. Selected items will appear with a check mark. After you selected all desired items click on the right facing arrow button. Once you see items added to the list click "Save Items"'
    },
    {
      q: 'Having issues with registration or log-in?',
      a: 'Please send an email to ',
      externalLink: {link: 'mailto:paircarecontact@gmail.com', label: 'paircarecontact@gmail.com'}
    },
  ];

  return (
    <div className="faq">
        <h1>Frequently Asked Questions</h1>
        {questions && questions.map(q => (
          <Accordion key={q}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{fontWeight: '500', color: '#226d77'}}>{q.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {q.a}
                {q.link && <Link to={q.link.to}>{q.link.label}.</Link>}
                {q.externalLink && <a href={q.externalLink.link}>{q.externalLink.label}.</a>}
                {q.a2 && <span><br/><br/>{q.a2}</span>}
                {q.a2 && <span><br/><br/>{q.a3}</span>}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  )
}

export default FAQ;