use anchor_lang::prelude::*;

declare_id!("61UHUNKaA3zo8g9uB542WZNu1zHLmYV9iaHRCAPeoVbf");

// Адрес твоего токена OKAK
pub const OKAK_TOKEN_MINT: &str = "C8b1gN1rm5Mvp9KXfFbC4jzB3mYZafDJgAFfUebo9Qq2";

#[program]
pub mod okak {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let okak_info = &mut ctx.accounts.okak_info;
        okak_info.authority = ctx.accounts.authority.key();
        okak_info.total_supply = 1_000_000_000_000_000; // 1,000,000 токенов с 9 десятичными знаками
        okak_info.surprised_cats = 0;

        msg!("🐱 OkakCat initialized! Ready for surprises!");
        Ok(())
    }

    pub fn surprise_reaction(ctx: Context<SurpriseReaction>) -> Result<()> {
        let okak_info = &mut ctx.accounts.okak_info;
        okak_info.surprised_cats = okak_info.surprised_cats.checked_add(1).unwrap();

        msg!("😺 Another cat got surprised! Total: {}", okak_info.surprised_cats);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 8 + 8,
        seeds = [b"okak_info"],
        bump
    )]
    pub okak_info: Account<'info, OkakInfo>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SurpriseReaction<'info> {
    #[account(
        mut,
        seeds = [b"okak_info"],
        bump
    )]
    pub okak_info: Account<'info, OkakInfo>,
    pub user: Signer<'info>,
}

#[account]
pub struct OkakInfo {
    pub authority: Pubkey,
    pub total_supply: u64,
    pub surprised_cats: u64,
}
