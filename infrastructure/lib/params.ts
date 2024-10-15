interface StackParams {
  deploymentAccount: string;
  deploymentRegion: string;
  resourceNameSuffix: string;
}

const accounts = {
  // mark's account
  dev: "051826719965",
  prod: "051826719965",
};

export const params: { [x: string]: StackParams } = {
  dev: {
    deploymentAccount: accounts["dev"],
    deploymentRegion: "ap-southeast-2",
    resourceNameSuffix: "dev",
  },
  prod: {
    deploymentAccount: accounts["prod"],
    deploymentRegion: "ap-southeast-2",
    resourceNameSuffix: "prod",
  },
};
