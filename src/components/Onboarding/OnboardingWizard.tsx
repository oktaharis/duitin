
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingProgress } from "./OnboardingProgress";
import { OnboardingStep1 } from "./OnboardingStep1";
import { OnboardingStep2 } from "./OnboardingStep2";
import { OnboardingStep3 } from "./OnboardingStep3";
import { OnboardingStep4 } from "./OnboardingStep4";

export const OnboardingWizard = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    submitOnboarding,
    skipOnboarding,
    isSubmitting,
  } = useOnboarding();

  const handleSkip = async () => {
    await skipOnboarding();
    navigate("/home", { replace: true });
  };

  const handleComplete = async () => {
    try {
      await submitOnboarding.mutateAsync(formData);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OnboardingStep1
            purpose={formData.purpose}
            purposeOther={formData.purposeOther || ''}
            onPurposeChange={(purpose) => updateFormData({ purpose })}
            onPurposeOtherChange={(purposeOther) => updateFormData({ purposeOther })}
            onNext={nextStep}
            onSkip={handleSkip}
          />
        );
      case 2:
        return (
          <OnboardingStep2
            hasMonthlyTarget={formData.hasMonthlyTarget}
            monthlyTargetAmount={formData.monthlyTargetAmount}
            onTargetChange={(hasMonthlyTarget) => updateFormData({ hasMonthlyTarget })}
            onAmountChange={(monthlyTargetAmount) => updateFormData({ monthlyTargetAmount })}
            onNext={nextStep}
            onPrev={prevStep}
            onSkip={handleSkip}
          />
        );
      case 3:
        return (
          <OnboardingStep3
            wantsDailyReminder={formData.wantsDailyReminder}
            onReminderChange={(wantsDailyReminder) => updateFormData({ wantsDailyReminder })}
            onNext={nextStep}
            onPrev={prevStep}
            onSkip={handleSkip}
          />
        );
      case 4:
        return (
          <OnboardingStep4
            purpose={formData.purpose}
            purposeOther={formData.purposeOther || ''}
            hasMonthlyTarget={formData.hasMonthlyTarget}
            monthlyTargetAmount={formData.monthlyTargetAmount}
            wantsDailyReminder={formData.wantsDailyReminder}
            onComplete={handleComplete}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">💰 CatatUang</h1>
          <p className="text-muted-foreground">
            Mari siapkan aplikasi sesuai kebutuhan Anda
          </p>
        </div>
        
        <OnboardingProgress currentStep={currentStep} totalSteps={4} />
        
        {renderCurrentStep()}
      </div>
    </div>
  );
};
