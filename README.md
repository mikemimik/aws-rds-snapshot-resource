# aws-rds-snapshot-resource
An Concourse resource for managing AWS RDS snapshots.

# Source Configuration


# Behaviour

## `CHECK`
> no-op function

## `IN`
> to be documented

## `OUT`

### Parameters


# Examples
#### Resource Type:
```yaml
resource_types:
- name: rds-snapshot-resource
  type: docker-image
  source:
    repository: mperrotte/aws-rds-snapshot-resource
```

```yaml
resources:
- name: rds-snapshot
  type: rds-snapshot-resource
  source:
    aws_access_key: ((aws-access-key-id))
    aws_secret_access_key: ((aws-secret-access-key))
    aws_region: us-east-1
    rds_instance_identifier: some-rds-name
    tags:
      - Key: some-tag
        Value: some-value
      - Key: other-tag
        Value: other-value
```

#### Plan Usage
```yaml
plan:
- put: rds-snapshot
  params:
    snapshot_identifier: name-of-the-snapshot
```
