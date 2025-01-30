# Contribution Guide


## Can I contribute to the docs?

Yes! 

While ownership of the documentation sits with the Product team, keeping docs up to date is a continuous effort.

We therefore encourage everyone to be proactive in fixing issues with the docs and contributing new content.


### Pull Request Process

1. **Branch Creation**
  - Create a new branch from the main branch
  - Use a descriptive name following the format: `type/description`
  - Examples: `docs/update-sdk-installation`, `fix/broken-links`

2. **Making Changes**
  - Follow the existing document structure
  - Ensure all links are working
  - Include images in the `/images` directory when needed
  - Preview changes locally using `mintlify dev`

3. **Pull Request Submission**
  - Create a pull request against the main branch
  - Provide a clear title and description
  - Reference any related issues
  - Include screenshots for UI changes

4. **Review Process**
  - All PRs require at least one review
  - All PRs must pass the CI broken link checker (even if your PR didn't break a link, one may have become broken)
  - Address any feedback or requested changes
  - Ensure the preview deployment is successful

## What's the style guide?

We don't have a style guide that's actively maintained, as we currently have no docs function at Ditto.

You may find some content in Notion, but it's quite complex and now stale in places.

Instead, we recommend looking to Grafana's style guide, which is very good, for some inspiration:
https://grafana.com/docs/writers-toolkit/write/


## How do I fix an issue I've spotted?

Simply clone this repo and edit the content in your favorite IDE. Or, make the change directly in Github.

You'll need to raise a pull request, which will automatically request approval from the relevant subject matter experts [CX/PM](https://github.com/orgs/getditto/teams/docs-mergers).

When making changes to versioned SDK content, consider whether a change is needed on any prior versions also. The 
versions are organised into their own directories.

See [Development](./README.md#development) and [Publishing Changes](./README.md#publishing-changes) for the development 
work flow. 

## How do I add a new page?

1. Create a new MDX file in the appropriate directory (top-level directories generally represent the top-level tabs)
2. Add some front matter to the page to specify the title, description and [fontawesome](https://fontawesome.com/icons) navigation icon
3. Write your content in a Markdown format. You can use Mintlify MDX [components](https://fontawesome.com/icons) as needed
4. Add your page to the appropriate group, or create a new group if appropriate. See [Mintlify docs](https://mintlify.com/docs/settings/navigation) for more on navigation
   
Example:

`cloud/backend-architecture/new-bigpeer-concept.mdx`

```markdown
---
title: "Cool New Big Peer Concept"
description: "This explains a new concept in Big Peer"
icon: arrow-right-arrow-left
iconType: solid
---

# New Thing

It's new!
```

`mint.json`
```
{
   "group": "Reference",
   "pages": [
     {
       "group": "Backend Architecture",
       "icon": "cubes-stacked",
       "iconType": "solid",
       "pages": [
         "cloud/backend-architecture",
         "cloud/backend-architecture/cloud-optional-design",
         "cloud/backend-architecture/timestamps",
         "cloud/backend-architecture/causally-consistent-design",
         "cloud/backend-architecture/failure-handling",
         "cloud/backend-architecture/new-bigpeer-conecpt" # new page
       ]
     },
     "cloud/release-notes",
     "cloud/compatibility-map"
   ]
 }
```


## I've spotted a broken link to old docs which I can't easily update. How do I create a redirect?

Redirects are managed directly in Mintlify. You can create one in the `redirects` section of the `mint.json` file. 

It supports a static redirect, for example:

```json
{
  "source": "/about-ditto",
  "destination": "/home/about-ditto"
}
```

Or can accept a wildcard URL:
```json
{
    "source": "/install-guides/:slug*",
    "destination": "/sdk/latest/install-guides/:slug*"
}
```

## How do I release a new version of the SDK docs?

Versioned content is organised into directories, representing each version (eg. v4-7, v4-8).

Whichever happens to be the latest version (at time of writing 4.9), should live under the `latest` directory. 

This is to provide a consistent destination for links in evergreen content or external links to the docs, so we avoid 
over-indexing old versions.

To publish a new version, you'll need to:
* Duplicate the `latest` directory, renaming it to the version it represents (eg. if you're releasing 4.10, you'd create the 4.9 directory. `latest` then becomes the 4.10 docs)
* Update the `versions` section in `mint.json` to make the new version default
    ```
      "versions": [
        {
          "name": "v4.10",
          "default": true
        },
        "v4.9"
        "v4.8",
        "v4.7"
      ]
    ```
* Update the `tabs` section in `mint.json` to point the new version at the `latest` directory, and create a new group for the old version
```
    {
      "name": "SDK",
      "url": "sdk/latest",
      "version": "v4.10"
    },
    {
      "name": "SDK",
      "url": "sdk/v4-9",
      "version": "v4.9"
    },
    ...
```
* Create the new content needed in files under the `latest` directory

If you're deleting files for features that are no longer relevant in the new version, you may wish to consider adding in
a redirect so that users can find the content in the old version.  
