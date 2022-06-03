import { useState } from 'react';

import { Action, Entity } from '../../types/index.ts';
import { ActionDialog } from './ActionDialog';
import { OptionsMenu } from './OptionsMenu';

interface Props {
  entity: Entity;
  id: string;
  title: string;
}

export const DialogContainer = ({ entity, id, title }: Props) => {
  const [action, setAction] = useState<Action>('');

  return (
    <>
      <OptionsMenu entity={entity} setAction={setAction} />
      <ActionDialog
        entity={entity}
        setAction={setAction}
        id={id}
        title={title}
        action={action}
      />
    </>
  );
};
