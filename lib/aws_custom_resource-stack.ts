import { Stack, StackProps } from "aws-cdk-lib";
import { EventBus } from "aws-cdk-lib/aws-events";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  PhysicalResourceId,
} from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";

export class AwsCustomResourceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bus = new EventBus(this, "EventBus", {
      eventBusName: "CustomResourceTestEventBus",
    });

    const eventBridgeService = "EventBridge";
    const ruleName = "CustomResourceRule";
    const resourceId = "RuleFromCustomResource";
    const rule = {
      Name: ruleName,
      Description: ruleName,
      EventBusName: bus.eventBusName,
      EventPattern: JSON.stringify({
        Source: ["AnySource"],
        Detail: {
          hello: [null],
        },
      }),
    };
    new AwsCustomResource(this, "RuleCustomResource", {
      onCreate: {
        service: eventBridgeService,
        action: "putRule",
        parameters: rule,
        physicalResourceId: PhysicalResourceId.of(resourceId),
      },
      onUpdate: {
        service: eventBridgeService,
        action: "putRule",
        parameters: rule,
        physicalResourceId: PhysicalResourceId.of(resourceId),
      },
      onDelete: {
        service: eventBridgeService,
        action: "deleteRule",
        parameters: {
          Name: ruleName,
          EventBusName: bus.eventBusName,
        },
      },
      policy: AwsCustomResourcePolicy.fromStatements([
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ["events:PutRule", "events:DeleteRule"],
          resources: [
            `arn:aws:events:${Stack.of(this).region}:${
              Stack.of(this).account
            }:rule/${bus.eventBusName}/${ruleName}`,
          ],
        }),
      ]),
    });
  }
}
