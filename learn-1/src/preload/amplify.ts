import Amplify from '@aws-amplify/core';
import config from 'src/aws-exports';

export default function init ()
{
  Amplify.configure(config);
}