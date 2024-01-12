import { FieldValues, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validation';
import classNames from 'classnames';

import DeleteIcon from '@assets/icons/grey-delete-icon.svg';
import styles from '../../style.module.scss';
import { useEffect, useState } from 'react';

interface IPropTypes {
  id?: number;
  defaultQuestion?: string;
  defaultAnswer?: string;
  hide?: () => void;
  add?: (values: FieldValues) => void;
  update?: (id: number, values: FieldValues) => void;
  remove?: (id: number) => void;
}

interface IForm {
  question: string;
  answer: string;
}

const QuestionItem = ({
  id,
  defaultQuestion,
  defaultAnswer,
  hide,
  remove,
  update,
  add,
}: IPropTypes) => {
  const methods = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const errorsLength = Object.keys(errors).length;
  const question = useWatch({
    control,
    name: 'question',
  });
  const answer = useWatch({
    control,
    name: 'answer',
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const onSuccess = (values: FieldValues): void => {
    if (id !== null && id !== undefined) {
      if (update) {
        update(id, values);
      }
    } else {
      if (add) {
        add(values);
      }
    }
  };

  const removeQuestion = () => {
    if (id !== null && id !== undefined && remove) {
      remove(id);
    } else {
      if (hide) {
        hide();
      }
    }
  };

  useEffect(() => {
    if (question && question !== defaultQuestion) {
      return setIsDisabled(false);
    }

    if (answer && answer !== defaultAnswer) {
      return setIsDisabled(false);
    }

    setIsDisabled(true);
  }, [answer, question, defaultAnswer, defaultQuestion, errors]);

  return (
    <div className={styles.admin__faq_item}>
      <form onSubmit={handleSubmit(onSuccess)}>
        <div className={classNames(styles.admin__faq_group, styles.admin__faq_group_question)}>
          <p className={styles.admin__faq_group_title}>Question</p>
          <textarea
            className={styles.admin__faq_group_input}
            defaultValue={defaultQuestion}
            {...register('question')}
          />
          {errors?.question?.message ? (
            <p className={styles.admin__faq_group_error}>
              {errors.question.message}
            </p>
          ) : null}
        </div>
        <div className={classNames(styles.admin__faq_group)}>
          <p className={styles.admin__faq_group_title}>Answer</p>
          <textarea
            className={styles.admin__faq_group_area}
            defaultValue={defaultAnswer}
            {...register('answer')}
          />
          {errors?.answer?.message ? (
            <p className={styles.admin__faq_group_error}>
              {errors.answer.message}
            </p>
          ) : null}
        </div>
        <div className={styles.admin__faq_controller}>
          <button
            type="submit"
            className={classNames(styles.admin__faq_item_save, styles.btn)}
            disabled={isDisabled || !!errorsLength}
          >
            save
          </button>
          <button className={styles.admin__faq_item_delete} onClick={removeQuestion} type="button">
            <img src={DeleteIcon} alt="" />
            delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionItem;
