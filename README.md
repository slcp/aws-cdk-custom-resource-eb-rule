# Creating an Eventbridge Rule containing a null value with CDK (in Typescript)

This project has been created using the TypeScript template from CDK CLI.

As per this [issue](https://github.com/aws/aws-cdk/issues/8660), Cloudformation does not support the use of a `null` value anywhere within a template. This is unfortunate because Eventbridge Rules do support `null` values and their use is detailed [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/CloudWatchEventsandEventPatterns.html).

This repository is a light implentation of defining and managing an Eventbridge Rule that uses `null` as one its pattern matches using a Cloudformation `CustomResource` in CDK. The Rule must ultimately be deployed via the API and not directly from CloudFormation but that doesn't mean that we have to lose the CloudFormation goodness of lifecycle and failure management. The `AWSCustomResource` Cosntruct in CDK makes this very easy and out of the box is capable of handling the required API calls for you with the right configuration, no actual lambda writing/deploying for you directly.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
