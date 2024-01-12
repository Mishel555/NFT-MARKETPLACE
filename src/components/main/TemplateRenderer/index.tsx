import { Fragment, ReactNode } from 'react';
import { ETemplates } from '@constants/types/enums';
import {
  AuthTemplate,
  BlankTemplate,
  EditorTemplate,
  MainTemplate,
  SettingsTemplate,
} from '@components/templates';

interface IProps {
  template?: ETemplates;
  children: ReactNode;
}

const TemplateRenderer = ({
  template,
  children,
}: IProps) => {
  switch (template) {
    case ETemplates.Auth:
      return <AuthTemplate>{children}</AuthTemplate>;
    case ETemplates.Main:
      return <MainTemplate>{children}</MainTemplate>;
    case ETemplates.Blank:
      return <BlankTemplate>{children}</BlankTemplate>;
    case ETemplates.Settings:
      return <SettingsTemplate>{children}</SettingsTemplate>;
    case ETemplates.Editor:
      return <EditorTemplate>{children}</EditorTemplate>;
    default:
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <Fragment>{children}</Fragment>;
  }
};

export default TemplateRenderer;
