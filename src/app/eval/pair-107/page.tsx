"use client";

import React from "react";
import { ListChecks, Share2, Sparkles } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { AssistantMessage } from "@/components/ds/AssistantMessage";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Scenario — "Praxis assistant setup" phone screen, RTL / Hebrew:
 * the 3-step configuration wizard (ui:questionnaire) the user is filling in,
 * the assistant's readiness report on a dark chat card (ds:AssistantMessage),
 * and the setup-summary share sheet (ui:dialog, custom close button pattern)
 * open over the bottom of the screen via defaultOpen.
 */

const wizardItems = [
  { name: "task", required: true },
  { name: "review", required: true },
  { name: "delivery", required: true },
] as const;

const itemClassName =
  "data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none";

function Choice({ title, note }: { title: string; note: string }) {
  return (
    <>
      <span className="font-medium">{title}</span>
      <span className="text-[12px] leading-[16px] text-muted-foreground">
        {note}
      </span>
    </>
  );
}

export default function Page() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <EvalShell theme="light" dir="rtl">
      <Dialog defaultOpen>
        <div className="mx-auto flex w-full max-w-[420px] flex-col px-4 pb-8 pt-5">
          {/* Screen header */}
          <header className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-[17px] font-semibold leading-tight">
                הגדרת הסייען
              </h1>
              <p className="mt-1 text-[11px] leading-[16px] text-muted-foreground">
                סביבת העבודה: שיווק · טיוטה 3 · לפני 4 דקות
              </p>
            </div>
            <span className="mt-0.5 flex flex-none items-center gap-1.5 rounded-full border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-neutral-700">
              <span className="size-1.5 rounded-full bg-success-500" />
              מוכן להפעלה
            </span>
          </header>

          {/* Setup wizard — ui:questionnaire */}
          <section className="mt-4 rounded-xl border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <ListChecks className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold leading-none">
                אשף ההגדרות
              </h2>
              <span className="text-[11px] text-muted-foreground">
                · 3 שלבים
              </span>
            </div>
            <Questionnaire
              defaultItem="task"
              items={wizardItems}
              onSubmit={handleSubmit}
            >
              <QuestionnaireProgress />

              <QuestionnaireItem className={itemClassName} name="task" required>
                <QuestionnaireTitle>
                  מה תפקידו העיקרי של הסייען?
                </QuestionnaireTitle>
                <QuestionnaireDescription>
                  בחרו את סוג העבודה שהסייען יבצע בהפעלה הראשונה.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="implement" defaultChecked>
                    <Choice
                      title="יישום בקשות הצוות"
                      note="כתיבה, עריכה וביצוע משימות שוטפות"
                    />
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="debug">
                    <Choice
                      title="איתור ותיקון תקלות"
                      note="ניתוח שגיאות, יומנים ותיקון שורש"
                    />
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="review">
                    <Choice
                      title="סקירת תוכן ובקרת איכות"
                      note="דיוק, אחידות והתאמה למדיניות"
                    />
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>

              <QuestionnaireItem className={itemClassName} name="review" required>
                <QuestionnaireTitle>
                  באיזה עומק לבדוק כל משימה?
                </QuestionnaireTitle>
                <QuestionnaireDescription>
                  רמת הוודאות שתידרש לפני מסירת תוצאה.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="targeted">
                    <Choice
                      title="בדיקות ממוקדות בלבד"
                      note="בדיקת השינויים הרלוונטיים בלבד"
                    />
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="complete">
                    <Choice
                      title="סביבת בדיקות מלאה"
                      note="הרצת כל בדיקות המערכת לפני מסירה"
                    />
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="manual">
                    <Choice
                      title="בדיקות אוטומטיות ואבחון ידני"
                      note="כולל בדיקת עין של איש מקצוע"
                    />
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>

              <QuestionnaireItem className={itemClassName} name="delivery" required>
                <QuestionnaireTitle>כיצד למסור את התוצאות?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  פורמט המסירה בסיום כל משימה.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="summary">
                    <Choice
                      title="סיכום תמציתי בצ׳אט"
                      note="שורות סיכום קצרות בתוך השיחה"
                    />
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="diff">
                    <Choice
                      title="סיכום ורשימת קבצים ששונו"
                      note="כולל קישור לכל קובץ שנערך"
                    />
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="handoff">
                    <Choice
                      title="מסמך מסירה מפורט"
                      note="מסמך מלא לצוות ההמשך"
                    />
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>

              <QuestionnaireActions>
                <QuestionnairePrevious>הקודם</QuestionnairePrevious>
                <QuestionnaireNext>הבא</QuestionnaireNext>
                <QuestionnaireSubmit>שמירת הגדרות</QuestionnaireSubmit>
              </QuestionnaireActions>
            </Questionnaire>
          </section>

          {/* Assistant readiness report — ds:AssistantMessage on the dark
              chat canvas it is designed for */}
          <section className="mt-4 rounded-xl bg-neutral-900 p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex size-6 flex-none items-center justify-center rounded-md bg-neutral-800 text-neutral-300">
                  <Sparkles className="size-3.5" />
                </span>
                <span className="text-[12px] font-medium text-neutral-300">
                  הודעת הסייען
                </span>
              </div>
              <span className="font-code text-[11px] text-neutral-500">
                09:41
              </span>
            </div>
            <AssistantMessage>
              <AssistantMessage.Paragraph>
                סיימתי את סקירת סביבת העבודה והכנת הסייען להפעלה. 12 הגדרות
                ישנות תוקנו בהתאם למדיניות הארגון.
              </AssistantMessage.Paragraph>
              <AssistantMessage.List
                items={[
                  "חיבור למאגר התוכן אושר בהרשאת קריאה בלבד",
                  "כללי הפרטיות עודכנו לגרסה 2.4 של מדיניות הארגון",
                  "ניטור שגיאות הופעל עם התראה בתוך 4 שעות עבודה",
                ]}
              />
              <AssistantMessage.Quote>
                לפני ההפעלה נדרש אישור מנהל — הקישור לסיכום ההגדרות מוכן
                לשיתוף בתחתית המסך.
              </AssistantMessage.Quote>
              <AssistantMessage.Paragraph>
                אפשר לכוונן את ההגדרות באשף שלמעלה, ואתאים את עצמי לבחירות
                שלכם.
              </AssistantMessage.Paragraph>
            </AssistantMessage>
          </section>

          {/* The button that opened the share sheet */}
          <div className="mt-4">
            <DialogTrigger
              render={
                <Button variant="outline" size="lg" className="w-full">
                  <Share2 />
                  שיתוף סיכום ההגדרות
                </Button>
              }
            />
          </div>
        </div>

        {/* Setup-summary share sheet — ui:dialog (custom close button
            pattern), open in this static review state via defaultOpen on the
            Dialog root. Rendered as a mobile bottom sheet. */}
        <DialogContent className="top-auto bottom-0 left-0 right-0 max-w-full translate-x-0 translate-y-0 rounded-none rounded-t-2xl border-x-0 border-b-0 p-5 sm:max-w-full">
          <DialogHeader>
            <DialogTitle>שיתוף סיכום ההגדרות</DialogTitle>
            <DialogDescription>
              לכל מי שיש בידיו את הקישור תהיה גישת צפייה בלבד בהגדרות הסייען.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="setup-link" className="sr-only">
                קישור לסיכום ההגדרות
              </Label>
              <Input
                id="setup-link"
                dir="ltr"
                defaultValue="https://praxis.dev/setup/asst-7741"
                readOnly
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" size="lg" className="w-full">
                  סגירה
                </Button>
              }
            />
            <DialogClose
              render={
                <Button size="lg" className="w-full">
                  העתקת הקישור
                </Button>
              }
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </EvalShell>
  );
}
