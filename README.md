## Ditto Documentation

This repo contains the documentation for https://docs.ditto.live/ 

All documentation is written in Markdown and deployed to Mintlify, our docs platform.

Any changes to the content of the docs should be made here. A few individuals have access to the Mintlify web app for 
admin purposes, as we have limited seats. It isn't needed to contribute, but if you feel you do need this access, 
please get in touch with the Product team. 

## Repository Structure

The documentation is organized into the following main sections:

- `/sdk` - Software Development Kit documentation
    - Version-specific guides (e.g., v4-8)
    - Installation guides
    - API references
    - Document models
    - CRUD operations
    - Data types

- `/cloud` - Cloud platform documentation
    - MongoDB connector guides
    - Portal usage
    - Access control
    - Application management

- `/best-practices` - Best practices and recommendations
- `/dql` - Query language documentation
- `/support` - Support-related documentation
- `/home` - Homepage and getting started content
- `/images` - Documentation assets and images

Configuration files:
- `mint.json` - Main configuration file for the documentation
- `styles.css` - Custom styling

## Contributing

We actively encourage anyone to make contributions to the docs.

See the [contribution guide](./CONTRIBUTING.md) for some guidance.

If you've spotted an issue or have a suggestion you don't feel able to address yourself, please feel free to bring it 
up in the #docs channel.

Tasks can be tracked in the [docs Linear team](https://linear.app/ditto/team/DOCS/all).

## Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To 
install, use the following command

```
npm i -g mintlify
```

Run the following command at the root of your documentation (where mint.json is)

```
mintlify dev
```

You can learn more about Mintlify and the components available to you here:
https://mintlify.com/docs/quickstart

## Publishing Changes

All changes submitted in a PR will be deployed to a preview branch. You can find a link to it in the Github Action that 
will automatically run.

On merge to main, changes will be automatically published to production, no further action is required. 

### Troubleshooting

- Mintlify dev isn't running - Run `mintlify install` it'll re-install dependencies.
- Page loads as a 404 - Make sure you are running in a folder with `mint.json`
