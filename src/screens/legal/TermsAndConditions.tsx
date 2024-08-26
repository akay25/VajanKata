import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {H1} from '~/components/Headings';
import colors from '~/styles/colors';
import LegalBaseLayout from './LegalBaseLayout';

const TermsAndConditionsScreen = () => {
  return (
    <LegalBaseLayout
      heading="Hello 👋"
      subHeading="Before you create an account, please read and accept our terms and
      conditions">
      <H1 text={'Terms & Conditions'} />
      <Text style={styles.tcP}>
        {`By accessing this website we assume you accept these terms and conditions. Do not continue to use Chettu if you do not agree to take all of the terms and conditions stated on this page.`}
      </Text>
      <Text style={styles.tcP}>
        {`The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of in. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.`}
      </Text>
      <Text style={styles.tcH}>Cookies</Text>
      <Text
        style={
          styles.tcP
        }>{`We employ the use of cookies. By accessing Chettu, you agreed to use cookies in agreement with the Chettu's Privacy Policy.

Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.`}</Text>
      <Text style={styles.tcH}>License</Text>
      <Text
        style={
          styles.tcP
        }>{`Unless otherwise stated, Chettu and/or its licensors own the intellectual property rights for all material on Chettu. All intellectual property rights are reserved. You may access this from Chettu for your own personal use subjected to restrictions set in these terms and conditions.

You must not:`}</Text>
      <Text style={styles.tcL}>{'\u2022'} Republish material from Chettu</Text>
      <Text style={styles.tcL}>
        {'\u2022'} Sell, rent or sub-license material from Chettu
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} Reproduce, duplicate or copy material from Chettu
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} Redistribute content from Chettu
      </Text>
      <Text
        style={
          styles.tcP
        }>{`Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Chettu does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Chettu,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Chettu shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.

Chettu reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.

You warrant and represent that:`}</Text>
      <Text style={styles.tcL}>
        {'\u2022'} You are entitled to post the Comments on our website and have
        all necessary licenses and consents to do so;
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} The Comments do not invade any intellectual property right,
        including without limitation copyright, patent or trademark of any third
        party;
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} The Comments do not contain any defamatory, libelous,
        offensive, indecent or otherwise unlawful material which is an invasion
        of privacy
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} The Comments will not be used to solicit or promote business
        or custom or present commercial activities or unlawful activity.
      </Text>
      <Text style={styles.tcP}>
        You hereby grant Chettu a non-exclusive license to use, reproduce, edit
        and authorize others to use, reproduce and edit any of your Comments in
        any and all forms, formats or media.
      </Text>
      <Text style={styles.tcH}>Hyperlinking to our Content</Text>
      <Text style={styles.tcP}>
        The following organizations may link to our Website without prior
        written approval:
      </Text>

      <Text style={styles.tcL}>{'\u2022'} Government agencies;</Text>
      <Text style={styles.tcL}>{'\u2022'} Search engines;</Text>
      <Text style={styles.tcL}>{'\u2022'} News organizations;</Text>
      <Text style={styles.tcL}>
        {'\u2022'} Online directory distributors may link to our Website in the
        same manner as they hyperlink to the Websites of other listed
        businesses; and
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} System wide Accredited Businesses except soliciting
        non-profit organizations, charity shopping malls, and charity
        fundraising groups which may not hyperlink to our Web site.
      </Text>
      <Text style={styles.tcP}>
        These organizations may link to our home page, to publications or to
        other Website information so long as the link: (a) is not in any way
        deceptive; (b) does not falsely imply sponsorship, endorsement or
        approval of the linking party and its products and/or services; and (c)
        fits within the context of the linking party's site..
      </Text>
      <Text style={styles.tcP}>
        We may consider and approve other link requests from the following types
        of organizations:
      </Text>

      <Text style={styles.tcL}>
        {'\u2022'} commonly-known consumer and/or business information sources;
      </Text>
      <Text style={styles.tcL}>{'\u2022'} dot.com community sites;</Text>
      <Text style={styles.tcL}>
        {'\u2022'} associations or other groups representing charities;
      </Text>
      <Text style={styles.tcL}>{'\u2022'} online directory distributors;</Text>
      <Text style={styles.tcL}>{'\u2022'} internet portals;</Text>
      <Text style={styles.tcL}>
        {'\u2022'} accounting, law and consulting firms; and
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} educational institutions and trade associations.
      </Text>
      <Text style={styles.tcP}>
        We will approve link requests from these organizations if we decide
        that: (a) the link would not make us look unfavorably to ourselves or to
        our accredited businesses; (b) the organization does not have any
        negative records with us; (c) the benefit to us from the visibility of
        the hyperlink compensates the absence of Chettu; and (d) the link is in
        the context of general resource information.
      </Text>
      <Text style={styles.tcP}>{`
These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.

If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Chettu. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.

Approved organizations may hyperlink to our App as follows:`}</Text>
      <Text style={styles.tcL}>
        {'\u2022'} By use of our corporate name; or
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} By use of the uniform resource locator being linked to; or
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} By use of any other description of our Website being linked
        to that makes sense within the context and format of content on the
        linking party's site.
      </Text>
      <Text style={styles.tcP}>
        No use of Chettu's logo or other artwork will be allowed for linking
        absent a trademark license agreement.
      </Text>
      <Text style={styles.tcH}>iFrames</Text>
      <Text style={styles.tcP}>
        Without prior approval and written permission, you may not create frames
        around our Webpages that alter in any way the visual presentation or
        appearance of our Website.
      </Text>
      <Text style={styles.tcH}>Content Liability</Text>
      <Text style={styles.tcP}>
        We shall not be hold responsible for any content that appears on your
        Website. You agree to protect and defend us against all claims that is
        rising on your Website. No link(s) should appear on any Website that may
        be interpreted as libelous, obscene or criminal, or which infringes,
        otherwise violates, or advocates the infringement or other violation of,
        any third party rights.
      </Text>
      <Text style={styles.tcH}>Reservation of Rights</Text>
      <Text style={styles.tcP}>
        We reserve the right to request that you remove all links or any
        particular link to our Website. You approve to immediately remove all
        links to our Website upon request. We also reserve the right to amen
        these terms and conditions and it's linking policy at any time. By
        continuously linking to our Website, you agree to be bound to and follow
        these linking terms and conditions.
      </Text>

      <Text style={styles.tcH}>Removal of links from our App</Text>
      <Text
        style={
          styles.tcP
        }>{`If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.

We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.`}</Text>

      <Text style={styles.tcH}>Disclaimer</Text>
      <Text style={styles.tcP}>
        To the maximum extent permitted by applicable law, we exclude all
        representations, warranties and conditions relating to our website and
        the use of this website. Nothing in this disclaimer will:
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} limit or exclude our or your liability for death or personal
        injury;
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} limit or exclude our or your liability for fraud or
        fraudulent misrepresentation;
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} limit any of our or your liabilities in any way that is not
        permitted under applicable law; or
      </Text>
      <Text style={styles.tcL}>
        {'\u2022'} exclude any of our or your liabilities that may not be
        excluded under applicable law.
      </Text>
      <Text style={styles.tcP}>
        The limitations and prohibitions of liability set in this Section and
        elsewhere in this disclaimer: (a) are subject to the preceding
        paragraph; and (b) govern all liabilities arising under the disclaimer,
        including liabilities arising in contract, in tort and for breach of
        statutory duty.
      </Text>
      <Text style={styles.tcP}>{`
As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.`}</Text>
    </LegalBaseLayout>
  );
};
export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  tcH: {
    marginTop: 10,
    marginBottom: 10,
    color: colors.DARK_BLUE,
    fontFamily: 'Jost-Medium',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: -0.25,
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    color: colors.DARK_GRAY,
    fontFamily: 'Jost',
    fontSize: 14,
    letterSpacing: -0.25,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    color: colors.DARK_GRAY,
    fontFamily: 'Jost',
    fontSize: 14,
    letterSpacing: -0.25,
  },
});
