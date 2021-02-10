import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

function SEO({ description, lang, meta, keywords, title }) {
  const { site } = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <script>
        {`function bemobCb(params) {
    var t = params.trackingDomain+'/click/';
    var re = new RegExp(t+'?(\\d*)');
    var e = document.querySelectorAll('a[href*="'+t+'"]');
    for (var i = 0; i < e.length; i++) {
        var ex = re.exec(e[i].href);
        if (ex) {
            e[i].href = params.ctaSecureUrl.replace('%%OFFER_NUMBER%%', ex[1] || 1);
        }
    }
}`}
      </script>
      <script>
        {`!function(){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://o06vt.bemobtrcks.com/landing/775fc9bd-0f40-400f-abb0-21c8ccfd415d?callback=bemobCb&rule=1&path=1&landing=1&"+window.location.search.substring(1);var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}();`}
      </script>
      <noscript>
        {`<img src="https://o06vt.bemobtrcks.com/landing/775fc9bd-0f40-400f-abb0-21c8ccfd415d?rule=1&path=1&landing=1" alt=""/>`}
      </noscript>
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  keywords: [],
  meta: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default SEO;
