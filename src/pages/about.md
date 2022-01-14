---
navbar: false
ppt:
    showPage: true
---

# project-k test cluster (cncf) by CICD

## Refer
https://github.ibm.com/IBMPrivateCloud/cncf

---

## CNCF certified minimal k8s distribution

- **k3s by Rancher**
> - :white_check_mark: local storage class
> - :white_check_mark: ingress controller
> - :white_check_mark: registry credentials and mirroring 
- microk8s by ubuntu
> - :white_check_mark: local storage class
> - :white_check_mark: ingress controller
> - :x: registry customization
- eks by Amazon

---

## K3S prepare steps

**Steps**
1. install `ubuntu` (20.04) server (Fyre ember)
2. install `kubectl` and `oc` clients
3. install `k3s` control plane (master node)
4. add worker nodes (optional)
5. configure registry (optional)
6. validation (`oc get nodes; oc get ns; oc get pods,svc -A`)

---

## K3S step 2 - kubectl oc

1. snap install kubectl --classic
2.  wget -O oc.tgz https://mirror.openshift.com/pub/openshift-v4/clients/ocp/latest/openshift-client-linux.tar.gz && tar xfv oc.tgz -C /usr/local/bin oc

---

## K3S step 3 - control plane

1. wget -O k3s.sh https://get.k3s.io
2. bash k3s.sh
- env INSTALL_K3S_CHANNEL=v1.21
- env INSTALL_K3S_EXEC="--disable-traefik"

---

## K3S step 4 - worker nodes (optional)

1. wget -O k3s.sh https://get.k3s.io
2. env K3S_URL=https://cicdk-1:6443 K3S_TOKEN=TOKEN bash k3s.sh
- `export TOKEN=$(cat /var/lib/rancher/k3s/server/node-token)`
---

## K3S step 5 - configure registry
- private registry
- registry mirroring
- `/etc/rancher/k3s/registries.yaml`
 ```
mirrors:
  quay.io:
    endpoint:
      - "https://quay-io.fyre.ibm.com:5000"
configs:
  "quay-io.fyre.ibm.com:5000":
    auth:
      username: cicdread
      password: cicdpriv
    tls:
      insecure_skip_verify: true
  "hyc-cloud-private-daily-docker-local.artifactory.swg-devops.com":
    auth:
      username: USERNAME
      password: TOKEN
    tls:
      insecure_skip_verify: true
 ```

---

## Bedrock steps on CNCF

**Steps**
1. install operator framework
2. create configmap for Bedrock on CNCF
3. install catalog source
4. install Bedrock installer operator
5. install operand requests
6. validation

---

## Bedrock step 1 - operator framework

1. wget -O olm.sh https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v0.19.1/install.sh
2. bash olm.sh v0.19.1

---

## Bedrock step 2 - configmap for Bedrock on CNCF

#### traefik for example
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: ibm-cpp-config
  namespace: ibm-common-services
data:
  domain_name: cp-console.CLUSTER1.fyre.ibm.com:NODEPORT
  kubernetes_cluster_type: cncf
```
- `export NODEPORT=$(oc -n kube-system get svc traefik --no-headers | sed -e "s/.*80://" -e "s/.TCP.*//")`

---

## Bedrock step 3 - catalog source

```
apiVersion: operator.ibm.com/v1alpha1
kind: CatalogSource
metadata:
  name: opencloud-operators
  namespace: olm
spec:
  displayName: IBM CS Operators
  sourceType: grpc
  publisher: IBM CS
  image: hyc-cloud-private-daily-docker-local.artifactory.swg-devops.com/ibmcom/ibm-common-service-catalog:k-daily
  updateStrategy:
    registryPoll:
      interval: 45m
```

---

## Bedrock steps - installer operator

```
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: ibm-common-service-operator
  namespace: ibm-common-services
spec:
  channel: v3
  name: ibm-common-service-operator
  installPlanApproval: Automatic
  source: opencloud-operators
  sourceNamespace: olm

---

apiVersion: operators.coreos.com/v1
kind: OperatorGroup
metadata:
  name: ibm-common-service-operator-operatorgroup
  namespace: ibm-common-services
spec:
  targetNamespaces:
    - ibm-common-services
```

---

## Bedrock step 5 - operand requests 

```
apiVersion: operator.ibm.com/v1alpha1
kind: OperandRequest
metadata:
  name: bootstrap-services
  namespace: ibm-common-services
spec:
  requests:
    - operands:
      - name: ibm-cert-manager-operator
      - name: ibm-mongodb-operator
      - name: ibm-iam-operator
      - name: ibm-management-ingress-operator
      registry: common-service
```